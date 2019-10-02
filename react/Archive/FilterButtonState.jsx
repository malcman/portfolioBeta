import React from 'react';

const classNames = require('classnames');

class FilterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: true,
    };
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    this.setState(prevState => ({
      selected: !prevState.selected,
    }));
    this.props.handleCheckboxChange(e);
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
          checked={this.state.selected}
          value={this.props.category}
          id={inputID}
          onChange={this.changeHandler}
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
