import React from 'react';
import SearchBar from './SearchBar.jsx'
import FilterForm from './FilterForm.jsx'

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
		// do this by adjusting width and height in CSS
		let formDisplay = ''
		if (!this.state.filtersShowing)
			formDisplay = 'shrinkToHide'

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

