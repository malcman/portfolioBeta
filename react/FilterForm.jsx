import React from "react";
import FilterButton from './FilterButton.jsx';

class FilterForm extends React.Component {
	constructor(props){
		super(props);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.createCategoryChecklist = this.createCategoryChecklist.bind(this);
		this.createFormManagementButtons = this.createFormManagementButtons.bind(this);
		this.createCategoryChecklist();
	}

	createFormManagementButtons() {

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

		return (
			<form id='filterForm'>
				<div id="filterGrid">
					{filterButtons}
				</div>
			</form>
		);
	}
}


export default FilterForm;
