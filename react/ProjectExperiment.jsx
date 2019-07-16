import React from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import ProjInfo from './ProjInfoExperiment';

const classNames = require('classnames');

class ProjExp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false,
    };
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  toggleFullScreen(e) {
    e.stopPropagation();
    this.setState(prevState => ({
      fullScreen: !prevState.fullScreen,
    }));
  }

  render() {
    const className = classNames('projExp', { fullScreen: this.state.fullScreen });

    return (
      <div className="projGridCell">
        <Flipper flipKey={this.state.fullScreen} spring="gentle">
          <Flipped flipId={this.props.title}>
            <div // eslint-disable-line
              className={className}
              onClick={this.toggleFullScreen}
            >
              <Flipped inverseFlipId={this.props.title}>
                <div>
                  <ProjInfo {...this.props} />
                </div>
              </Flipped>
            </div>
          </Flipped>
        </Flipper>
      </div>
    );
  }
}

export default ProjExp;
