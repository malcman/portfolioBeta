import React from "react";

class FilterForm extends React.Component {
	constructor(props){
		super(props);
		this.handleFormChange = this.handleFormChange.bind(this);
	}

	handleFormChange(e) {
		this.props.onFilterTextChange(e.target.value);
	}

	render() {

		return (
			<form id='filterForm'>
				<div id="filterGrid">
					<label className="FilterLabel">
						<div className="labelSkewer">
							Web Development
							<input
								type="checkbox"
								value="Web Development"/>
							<span className="checkmark"></span>
						</div>
					</label>
					<label className="FilterLabel">
						<div className="labelSkewer">
							Optimization
							<input
								type="checkbox"
								value="Optimization"/>
							<span className="checkmark"></span>
						</div>
					</label>
					<label className="FilterLabel">
						<div className="labelSkewer">
							Interaction Design
							<input
								type="checkbox"
								value="Interaction Design"/>
							<span className="checkmark"></span>
						</div>
					</label>
					<label className="FilterLabel">
						<div className="labelSkewer">
							Graphic Design
							<input
								type="checkbox"
								value="Graphic Design"/>
							<span className="checkmark"></span>
						</div>
					</label>
				</div>
			</form>
		);
	}
}


export default FilterForm;