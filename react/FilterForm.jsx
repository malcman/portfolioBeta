import React from "react";
import FilterButton from './FilterButton.jsx';

class FilterForm extends React.Component {
	constructor(props){
		super(props);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.createCategoryChecklist = this.createCategoryChecklist.bind(this);
		this.createFilterManagementButtons = this.createFilterManagementButtons.bind(this);
		this.createCategoryChecklist();
	}

	createFilterManagementButtons() {
		const numSelected = Object.values(this.props.filters).filter(Boolean).length
		const allTrue = numSelected === Object.values(this.props.filters).length;
		const allFalse = numSelected === 0;
		const selectAllButton = (
			<FilterButton
				key='SelectAll'
				catNoWhitespace='SelectAll'
				category='Select All'
				handleCheckboxChange={this.props.handleSelectAll}
				isSelected={allTrue}
				disable={allTrue}/>
		);

		const clearAllButton = (
			<FilterButton
				key='ClearAll'
				catNoWhitespace='ClearAll'
				category='Clear All'
				handleCheckboxChange={this.props.handleClearAll}
				isSelected={allFalse}
				disable={allFalse}/>
		);
		return [selectAllButton, clearAllButton];
	}


	createCategoryChecklist() {
		let filterButtons = []
		this.props.categories.forEach((category) => {
			// remove whitespace from categories for id and key
			const catNoWhitespace = category.replace(/\s/g,'');

			const newCategory = (
				<FilterButton
					key={catNoWhitespace}
					isSelected={this.props.filters[category]}
					category={category}
					catNoWhitespace={catNoWhitespace}
					handleCheckboxChange={this.props.handleCheckboxChange}/>
			);
			filterButtons.push(newCategory)
		});
		return filterButtons;
	}

	handleFormChange(e) {
		this.props.onFilterTextChange(e.target.value);
	}

	render() {
		const filterButtons = this.createCategoryChecklist();
		const managementButtons = this.createFilterManagementButtons();

		return (
			<form id='filterForm'>
				<div id="filterGrid">
					{filterButtons}
					{managementButtons}
				</div>
			</form>
		);
	}
}


export default FilterForm;
