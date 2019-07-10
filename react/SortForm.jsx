import React from 'react';
import SortButton from './SortButton';

const sortFunctions = {
  alphaNormal: {
    func: (a, b) => a.title < b.title,
    displayName: 'A - Z',
  },
  alphaReverse: {
    func: (a, b) => a.title > b.title,
    displayName: 'Z - A',
  },
  recent: {
    func: (a, b) => a.date < b.date,
    displayName: 'Date: Recent',
  },
  oldest: {
    func: (a, b) => a.date > b.date,
    displayName: 'Date: Oldest',
  },
};

class SortForm extends React.Component {
  constructor(props) {
    super(props);
    this.getSortButtons = this.getSortButtons.bind(this);
  }

  getSortButtons() {
    const sortButtons = [];
    Object.keys(sortFunctions).forEach((sort) => {
      const newSortButton = (<SortButton
        inputID={sort}
        key={sort}
        displayName={sortFunctions[sort].displayName}
        currentSort={this.props.currentSort}
        handleSortChange={this.props.handleSortChange}
      />);
      sortButtons.push(newSortButton);
    });
    return sortButtons;
  }

  render() {
    const sortButtons = this.getSortButtons();
    return (
      <form id="sortForm">
        <div id="sortGrid">
          {sortButtons}
        </div>
      </form>
    );
  }
}

export default SortForm;
