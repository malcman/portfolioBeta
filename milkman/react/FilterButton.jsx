import React from 'react';

const classNames = require('classnames');

class FilterButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.props.handleCheckboxChange();
  }

  render() {
    const inputID = this.props.catNoWhitespace;
    const allButton = inputID === 'SelectAll' || inputID === 'ClearAll';
    const className = classNames('FilterLabel', { selectorButton: allButton });

    return (
      <label className={className} htmlFor={inputID}>
        <input
          className="filterCheckbox"
          type="checkbox"
          checked={this.props.isSelected}
          value={this.props.category}
          id={inputID}
          onChange={this.props.handleCheckboxChange}
          disabled={this.props.disable}
        />
        <div className="FilterBKG">
          <span className="checkmark" />
        </div>
        <p>{this.props.category}</p>
      </label>);
  }
}

export default FilterButton;
