import React from 'react';
import PropTypes from 'prop-types';
import Project from './Project';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.getValidPieces = this.getValidPieces.bind(this);
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

  getValidPieces() {
    // TODO: add "filters applied" condition
    if (!this.props.searchText) {
      return this.props.pieces;
    }
    // gets valid pieces to display based on applied filters and search text
    const validPieces = [];
    const searchText = this.props.searchText.toLowerCase();
    const fullSimThreshold = 0.75;
    const shortSimThreshold = 0.7;

    // TODO: get valid pieces from tags/filters first

    // Filter further based on searchText
    this.props.pieces.forEach((piece) => {
      const fullTitle = piece.props.title.toLowerCase();
      const shortTitle = piece.props.titleShort.toLowerCase();
      // if the word is in the title
      // or it is similar enough
      if (fullTitle.indexOf(searchText) !== -1 ||
        Gallery.similarity(searchText, fullTitle) >= fullSimThreshold ||
        Gallery.similarity(searchText, shortTitle) >= shortSimThreshold) {
        validPieces.push(piece);
      }
    });
    return validPieces;
  }

  render() {
    const galleryClasses = `gallery ${this.props.classsName}`;
    const pieces = this.getValidPieces();
    return (
      <div className={galleryClasses}>
        {pieces}
      </div>
    );
  }
}

Gallery.propTypes = {
  pieces: PropTypes.arrayOf(PropTypes.element),
};

export default Gallery;
