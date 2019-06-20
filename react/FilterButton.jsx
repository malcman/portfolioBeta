import React from "react";

class FilterButton extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<label className="FilterLabel">
				<input
					className="filterCheckbox"
					type="checkbox"
					checked={this.props.isSelected}
					value={this.props.category}
					id={this.props.catNoWhitespace}
					onChange={this.props.handleCheckboxChange}/>
				<div className="FilterBKG">
					<span className="checkmark"></span>
				</div>
				<p>{this.props.category}</p>
			</label>);
	}
}

export default FilterButton;