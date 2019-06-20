import React from "react";

class FilterButton extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		const inputID = this.props.catNoWhitespace;
		let className = "FilterLabel";
		if (inputID === 'SelectAll' || inputID === 'ClearAll') {
			className += ' selectorButton'
		}
		return (
			<label className={className}>
				<input
					className="filterCheckbox"
					type="checkbox"
					checked={this.props.isSelected}
					value={this.props.category}
					id={inputID}
					onChange={this.props.handleCheckboxChange}
					disabled={this.props.disable}/>
				<div className="FilterBKG">
					<span className="checkmark"></span>
				</div>
				<p>{this.props.category}</p>
			</label>);
	}
}

export default FilterButton;