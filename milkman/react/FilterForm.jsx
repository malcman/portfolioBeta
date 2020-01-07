import React from 'react';
import FilterButton from './FilterButton';

function checkListSort(a, b) {
  // sort function used to help keep form elements in consistent
  // places between renders (weird safari bug)
  if (a.props.catNoWhitespace < b.props.catNoWhitespace) return -1;
  else if (a.props.catNoWhitespace > b.props.catNoWhitespace) return 1;
  return 0;
}

class FilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.createCategoryChecklist = this.createCategoryChecklist.bind(this);
    this.createFilterManagementButtons = this.createFilterManagementButtons.bind(this);
    this.checklist = [];
  }
  componentDidUpdate() {
    this.checklist = this.createCategoryChecklist();
  }

  createFilterManagementButtons() {
    // get buttons to allow for selecting and clearing all options
    const numSelected = Object.values(this.props.filters).filter(Boolean).length;
    const allTrue = numSelected === Object.values(this.props.filters).length;
    const allFalse = numSelected === 0;

    const selectAllButton = (
      <FilterButton
        key="SelectAll"
        catNoWhitespace="SelectAll"
        category="Select All"
        handleCheckboxChange={this.props.handleSelectAll}
        isSelected={allTrue}
        disable={allTrue}
      />
    );

    const clearAllButton = (
      <FilterButton
        key="ClearAll"
        catNoWhitespace="ClearAll"
        category="Clear All"
        handleCheckboxChange={this.props.handleClearAll}
        isSelected={allFalse}
        disable={allFalse}
      />
    );
    return [selectAllButton, clearAllButton];
  }


  createCategoryChecklist() {
    // create new filter button for each category in the data
    const filterButtons = [];
    Object.keys(this.props.filters).forEach((category) => {
      // remove whitespace from categories for id and key
      const catNoWhitespace = category.replace(/\s/g, '');
      const selected = this.props.filters[category];

      const newCategory = (
        <FilterButton
          key={catNoWhitespace}
          category={category}
          catNoWhitespace={catNoWhitespace}
          handleCheckboxChange={this.props.handleCheckboxChange}
          isSelected={selected}
        />
      );
      filterButtons.push(newCategory);
    });
    return filterButtons;
  }

  handleFormChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    const managementButtons = this.createFilterManagementButtons();
    const checklist = this.createCategoryChecklist();
    checklist.sort(checkListSort);

    return (
      <form id="filterForm">
        <div id="filterGrid">
          {checklist}
          {managementButtons}
        </div>
      </form>
    );
  }
}


export default FilterForm;
