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
		this.getFilterClass = this.getFilterClass.bind(this);
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
		this.props.handleFiltersToggle();
	}

	toggleSortDisplay() {
	//
	}

	getFilterClass() {
		// get number of filters applied for visual affordances on filter button
		const numSelected = Object.values(this.props.filters).filter(Boolean).length;
		const numFilters = Object.values(this.props.filters).length;
		const filterClass = classNames({'filtersApplied': numSelected < numFilters});
		return filterClass;
	}



	render() {
		// hide or show the filters based on toggle
		const formDisplay = classNames({'shrinkToHide':!this.state.filtersShowing});

		// style button differently if filters are applied
		const filterClass = this.getFilterClass();


		return (
			<div id='FilterManager'>
				<div id='searchBar'>
					<SearchBar
						filterText={this.state.filterText}
						onFilterTextChange={this.handleFilterTextChange}/>

				</div>
				<div id="ManagmentButtons">
					<button
						id="FilterToggle"
						className={filterClass}
						onClick={this.toggleFilterDisplay}>
						Filter
					</button>
					<button
						id="SortToggle"
						onClick={this.toggleSortDisplay}>
						Sort
					</button>
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

