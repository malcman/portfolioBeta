import React from 'react';
import PropTypes from 'prop-types';
import { Flipper } from 'react-flip-toolkit';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.getFilteredPieces = this.getFilteredPieces.bind(this);
    this.getValidPieces = this.getValidPieces.bind(this);
    this.getFlipKey = this.getFlipKey.bind(this);
    this.matchesSearchText = this.matchesSearchText.bind(this);
  }
  static similarity(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    const longerLength = longer.length;
    if (longerLength === 0) {
      return 1.0;
    }
    return (longerLength - Gallery.editDistance(longer, shorter)) / parseFloat(longerLength);
  }

  static editDistance(string1, string2) {
    // calculate Levenshtein distance for similarity helper function
    const s1 = string1.toLowerCase();
    const s2 = string2.toLowerCase();

    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  matchesSearchText(piece) {
    // functor for filtering pieces based on search text
    const searchText = this.props.searchText.toLowerCase();
    const fullTitle = piece.props.title.toLowerCase();
    const shortTitle = piece.props.titleShort.toLowerCase();

    // currently arbitrary match percentages used as minimum
    const fullSimThreshold = 0.75;
    const shortSimThreshold = 0.7;

    // if the word is in the title
    // or it is "similar enough"
    return (fullTitle.indexOf(searchText) !== -1 ||
        Gallery.similarity(searchText, fullTitle) >= fullSimThreshold ||
        Gallery.similarity(searchText, shortTitle) >= shortSimThreshold);
  }

  getFilteredPieces() {
    // gets valid pieces determined solely by filters applied
    const filteredPieces = [];
    this.props.pieces.forEach((piece) => {
      for (let i = 0; i < piece.props.tags.length; ++i) {
        const thisTag = piece.props.tags[i];
        if (this.props.activeFilters.indexOf(thisTag) !== -1) {
          filteredPieces.push(piece);
          break;
        }
      }
    });
    return filteredPieces;
  }

  getValidPieces() {
    // do no work if not needed
    if (!this.props.searchText &&
      this.props.maxFilters === this.props.activeFilters.length) {
      return this.props.pieces;
    }
    // gets valid pieces to display based on applied filters and search text
    let validPieces = this.getFilteredPieces();
    // Filter further based on searchText
    validPieces = validPieces.filter(this.matchesSearchText);
    return validPieces;
  }

  getFlipKey(pieceLength) {
    const titles = [];
    this.props.pieces.forEach((piece) => {
      titles.push(piece.props.titleShort);
    });
    // allows for filters to affect one Flipper component,
    // as it includes lenth in the flipKey
    titles.push(pieceLength);
    return titles.join(' ');
  }

  render() {
    const galleryClasses = `gallery ${this.props.classsName}`;
    const pieces = this.getValidPieces();
    const sortFlipKey = this.getFlipKey(pieces.length);

    return (
      // flipKey dependent on sort and filter allows for smooth animations
      <Flipper flipKey={sortFlipKey} id="sortFlippper" applyTransformOrigin={false}>
        <div className={galleryClasses}>
          {pieces}
        </div>
      </Flipper>
    );
  }
}

Gallery.propTypes = {
  pieces: PropTypes.arrayOf(PropTypes.element),
};

Gallery.defaultProps = {
  pieces: [],
};

export default Gallery;
