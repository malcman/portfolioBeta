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
		// TODO CHANGE get this from the data
		const categories = ['Web Development',
												'Optimization',
												'Graphic Design',
												'Interaction Design']

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
					<FilterForm categories={categories}/>
				</div>
			</div>
		);
	}

}

export default FilterManager;

