import React from 'react';
import MenuBar from './MenuBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      currentPage: this.props.page,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  handlePageChange(pageName) {
    // TODO: remove if using pure html page loads
    this.setState({
      currentPage: pageName,
    });
  }

  render() {
    return (
      <MenuBar
        windowWidth={this.state.width}
        currentPage={this.props.page}
      />
    );
  }
}

export default App;
