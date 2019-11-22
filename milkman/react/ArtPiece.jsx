import React from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import ClosingX from './ClosingX';

const classNames = require('classnames');

class ArtPiece extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      imgClass: 'square',
      bkgColor: 'transparent',
    };
    this.setImageClass = this.setImageClass.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
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
      if (width / height >= 1.5) {
        imgClass = 'wide';
      } else if (height / width >= 1.5) {
        imgClass = 'tall';
      }
      this.setState({
        imgClass,
      });
    };

    img.src = this.props.imgFile;
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
    return (
      <Flipper flipKey={this.state.expanded} spring="gentle">
        <Flipped flipId={this.props.title}>
          <div className={pieceClass} onClick={this.toggleExpand}>
            <ClosingX closerToggle={this.toggleExpand} />
            <img src={this.props.imgFile} alt={this.props.title} />
            <div className="artInfo">
              <h2 className={'artTitle'}>{this.props.title}</h2>
            </div>
          </div>
        </Flipped>
      </Flipper>
    );
  }
}

export default ArtPiece;
