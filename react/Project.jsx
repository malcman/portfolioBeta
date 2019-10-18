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
    if (this.state.fullScreen && !isCloser) {
      return;
    }
    this.setState(prevState => ({
      fullScreen: !prevState.fullScreen,
    }), () => {
      if (this.state.fullScreen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'visible';
      }
    });
    // console.log(this.state.fullScreeen);
    // const scrollEl = document.scrollingElement || document.documentElement;
    // console.log(scrollEl);
  }

  render() {
    const className = classNames('proj', { expanded: this.state.fullScreen });

    return (
      <div className="projGridCell">
        <Flipper
          flipKey={this.state.fullScreen}
          spring="gentle"
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
