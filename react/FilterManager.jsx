import React from 'react';
import SearchBar from './SearchBar.jsx'; // eslint-disable-line
import FilterForm from './FilterForm.jsx'; // eslint-disable-line
var classNames = require('classnames'); // eslint-disable-line

class FilterManager extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			filterText: '',
			filtersShowing: false,
			filterClass: 'hidden',
		};
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.toggleFilterDisplay = this.toggleFilterDisplay.bind(this);
		this.toggleSortDisplay = this.toggleSortDisplay.bind(this);
	}

	handleFilterTextChange(filterText) {
		this.setState({
			filterText: filterText,
		});
	}

	toggleFilterDisplay(e){
		e.preventDefault();
		this.setState((prevState) => ({
			filtersShowing: !prevState.filtersShowing
		}));
	}

	toggleSortDisplay() {
	//
	}



	render() {
		// hide or show the filters based on toggle
		const formDisplay = classNames({'shrinkToHide':!this.state.filtersShowing});

		return (
			<div id='FilterManager'>
				<div id='searchBar'>
					<SearchBar
						filterText={this.state.filterText}
						onFilterTextChange={this.handleFilterTextChange}/>

				</div>
				<div id="ManagmentButtons">
					<button id="FilterToggle" onClick={this.toggleFilterDisplay}>Filter</button>
					<button id="SortToggle" onClick={this.toggleSortDisplay}>Sort</button>
				</div>
				<div className={formDisplay} id="FilterContainer">
					<FilterForm
						categories={this.props.categories}
						handleCheckboxChange={this.props.handleCheckboxChange}
						filters={this.props.filters}
						handleSelectAll={this.props.handleSelectAll}
						handleClearAll={this.props.handleClearAll}/>
				</div>
			</div>
		);
	}

}

export default FilterManager;

