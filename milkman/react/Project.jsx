import React from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import ProjInfo from './ProjInfo';

const classNames = require('classnames');

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false,
    };
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  toggleFullScreen(e) {
    e.stopPropagation();
    // if open and a close button wasn't hit, don't do anyting
    const isCloser = e.target.classList.contains('projClose') || e.target.classList.contains('singleToggleLine');
    // hacky way to tell if this is the present on either side when in desktop view
    // must continue to be a "Flipped" component around the project for this to work
    const isCover = window.innerWidth > 1000 && e.target.getAttribute('data-inverse-flip-id');

    // if not any of the "acceptable" UX ways to close this, ignore the event
    if (this.state.fullScreen && !isCloser && !isCover) return;

    this.setState(prevState => ({
      fullScreen: !prevState.fullScreen,
    }), () => {
      // stop the body from scrolling underneath this module
      if (this.state.fullScreen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'visible';
        Project.removeHash();
      }
    });
  }

  static removeHash() {
    // effectively removes hash target in URL if it was clicked within the project
    // there may be a better way to do this with histry API, but this is easy
    // seems to work well with modern browsers
    if (window.location.hash) {
      history.back();
    }
  }

  render() {
    const className = classNames('proj', { expanded: this.state.fullScreen });

    return (
      <div className="projGridCell">
        <Flipper
          flipKey={this.state.fullScreen}
          className="projFlipper"
        >
          <Flipped flipId={this.props.title}>
            <div // eslint-disable-line
              className={className}
              onClick={this.toggleFullScreen}
            >
              <Flipped inverseFlipId={this.props.title}>
                <div>
                  <ProjInfo
                    handleExpandToggle={this.toggleFullScreen}
                    isOpen={this.state.fullScreen}
                    {...this.props}
                  />
                </div>
              </Flipped>
            </div>
          </Flipped>
        </Flipper>
      </div>
    );
  }
}

export default Project;
