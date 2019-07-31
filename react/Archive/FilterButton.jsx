import React from 'react';

const classNames = require('classnames');

function FilterButton(props) {
  const inputID = props.catNoWhitespace;
  const allButton = inputID === 'SelectAll' || inputID === 'ClearAll';
  const className = classNames('FilterLabel', { selectorButton: allButton });

  return (
    <label className={className} htmlFor={inputID}>
      <input
        className="filterCheckbox"
        type="checkbox"
        checked={props.isSelected}
        value={props.category}
        id={inputID}
        onChange={props.handleCheckboxChange}
        disabled={props.disable}
      />
      <div className="FilterBKG">
        <span className="checkmark" />
      </div>
      <p>{props.category}</p>
    </label>);
}

export default FilterButton;
