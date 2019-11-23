import React from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import ClosingX from './ClosingX';
import LoadingSpinner from './LoadingSpinner';

const classNames = require('classnames');

class ArtPiece extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      imgClass: 'square',
      bkgColor: 'transparent',
      loaded: false,
    };
    this.setImageClass = this.setImageClass.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  componentDidMount() {
    this.setImageClass();
  }

  setImageClass() {
    // set image class to wide, tall, or square based on natural dimensions
    const img = new Image();
    let imgClass = 'square';

    img.onload = () => {
      // get natural dimensions
      const height = img.height;
      const width = img.width;

      // determine class
      if (width / height >= 1.3) {
        imgClass = 'wide';
      } else if (height / width >= 1.3) {
        imgClass = 'tall';
      }
      this.setState({
        imgClass,
        loaded: true,
      });
    };

    img.src = this.props.imgFile;
  }

  handleKeyUp(e) {
    // allow users to push enter on to toggle for accessibility
    if (e.keyCode === 13 || e.which === 13) {
      this.toggleExpand(e);
    }
  }

  toggleExpand(e) {
    e.stopPropagation();
    this.setState(prevState => ({
      expanded: !prevState.expanded,
    }), () => {
      // stop the body from scrolling underneath this module
      if (this.state.expanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'visible';
      }
    });
  }

  render() {
    const pieceClass = classNames('artPiece',
      this.state.imgClass,
      { expanded: this.state.expanded });

    let content = <LoadingSpinner />;
    if (this.state.loaded) {
      content = <img src={this.props.imgFile} alt={this.props.title} />;
    }

    return (
      <Flipper flipKey={this.state.expanded}>
        <Flipped flipId={this.props.title}>
          <div
            className={pieceClass}
            onClick={this.toggleExpand}
            onKeyUp={this.handleKeyUp}
            role="menuitem"
            tabIndex="0"
            id={this.props.title}
          >
            <ClosingX closerToggle={this.toggleExpand} />

            <Flipped stagger delayUntil={this.props.title}>
              {content}
            </Flipped>

            <Flipped inverseFlipId={this.props.title}>
              <div className="artInfo">
                <h2 className={'artTitle'}>{this.props.title}</h2>
              </div>
            </Flipped>
          </div>
        </Flipped>
      </Flipper>
    );
  }
}

export default ArtPiece;
