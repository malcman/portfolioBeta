import React from "react";
var classNames = require('classnames'); // eslint-disable-line

class FilterButton extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		const inputID = this.props.catNoWhitespace;
		const allButton = inputID === 'SelectAll' || inputID === 'ClearAll';
		const className = classNames('FilterLabel',{'selectorButton': allButton})

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