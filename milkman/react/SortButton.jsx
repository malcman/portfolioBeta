import React from 'react';

function SortButton(props) {
  return (
    <label className="FilterLabel" htmlFor={props.inputID}>
      <input
        className="filterCheckbox"
        type="radio"
        checked={props.currentSort === props.inputID}
        id={props.inputID}
        value={props.inputID}
        onChange={props.handleSortChange}
      />
      <div className="FilterBKG">
        <span className="checkmark" />
      </div>
      <p>{props.displayName}</p>
    </label>
  );
}

export default SortButton;
