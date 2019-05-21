import React from 'react';
import MenuBar from './MenuBar';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			width: 0,
			height: 0,
			currentPage: ''
		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
		this.setState({
			currentPage: this.props.page,
		});
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}

	handlePageChange(pageName) {
		this.setState({
			currentPage: pageName
		});
	}

	render() {
		return (
			<MenuBar
				windowWidth={this.state.width}
				currentPage={this.state.currentPage}
				handlePageChange={this.handlePageChange}/>
		)
	}
}

export default App;