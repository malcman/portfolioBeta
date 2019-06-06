import React from 'react';
import SearchBar from './SearchBar.jsx'
import FilterForm from './FilterForm.jsx'

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
		const categories = ['Web Development', 'Optimization', 'Graphic Design', 'Interaction Design']
		return (
			<div id='FilterManager'>
				<div id='searchBar'>
					<SearchBar
						filterText={this.state.filterText}
						onFilterTextChange={this.handleFilterTextChange}/>

				</div>
				<FilterForm categories={categories}/>
			</div>
		);
	}

}

export default FilterManager;