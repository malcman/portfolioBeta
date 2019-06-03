import React from 'react';
import SearchBar from './SearchBar'

class FilterManager extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			filterText: '',
		};
	    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
	}

	handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

	render() {
		return (
			<div id='FilterManager'>
				<div id='searchBar'>
					<SearchBar
						filterText={this.state.filterText}
						onFilterTextChange={this.handleFilterTextChange}/>

				</div>
			</div>
		);
	}

}

export default FilterManager;