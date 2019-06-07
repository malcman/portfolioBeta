import React from "react";

class FilterForm extends React.Component {
	constructor(props){
		super(props);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.createCategoryChecklist = this.createCategoryChecklist.bind(this);
		this.createFormManagementButtons = this.createFormManagementButtons.bind(this);
		this.categories = [];
		this.createCategoryChecklist();
	}

	createFormManagementButtons() {

	}


	createCategoryChecklist() {
		this.props.categories.forEach((category) => {
			const catNoWhitespace = category.replace(/\s/g,'');
			const newCategory = (
				<label
					className="FilterLabel"
					key={catNoWhitespace}>
							<input
								className="filterCheckbox"
								type="checkbox"
								defaultChecked
								value={category}
								id={catNoWhitespace}/>
							<div className="FilterBKG">
								<span className="checkmark"></span>
							</div>
							<p>{category}</p>
					</label>);
			this.categories.push(newCategory)
		});
	}

	handleFormChange(e) {
		this.props.onFilterTextChange(e.target.value);
	}

	render() {

		return (
			<form id='filterForm'>
				<div id="filterGrid">
					{this.categories}
				</div>
			</form>
		);
	}
}


export default FilterForm;
