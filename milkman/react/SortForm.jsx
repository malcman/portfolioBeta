import React from 'react';
import SortButton from './SortButton';

const sortFunctions = {
  recent: {
    func: (a, b) => {
      const aDate = new Date(a.props.date);
      const bDate = new Date(b.props.date);
      if (aDate > bDate) return -1;
      if (aDate < bDate) return 1;
      return 0;
    },
    displayName: 'Date: Recent',
  },
  oldest: {
    func: (a, b) => {
      const aDate = new Date(a.props.date);
      const bDate = new Date(b.props.date);
      if (aDate < bDate) return -1;
      if (aDate > bDate) return 1;
      return 0;
    },
    displayName: 'Date: Oldest',
  },
  alphaNormal: {
    func: (a, b) => {
      if (a.props.title < b.props.title) return -1;
      if (a.props.title > b.props.title) return 1;
      return 0;
    },
    displayName: 'A - Z',
  },
  alphaReverse: {
    func: (a, b) => {
      if (a.props.title > b.props.title) return -1;
      if (a.props.title < b.props.title) return 1;
      return 0;
    },
    displayName: 'Z - A',
  },
};

class SortForm extends React.Component {
  constructor(props) {
    super(props);
    this.getSortButtons = this.getSortButtons.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange(e) {
    const inputID = e.target.id;
    this.props.handleSortChange(e.target.value, sortFunctions[inputID].func);
  }

  getSortButtons() {
    const sortButtons = [];
    Object.keys(sortFunctions).forEach((sort) => {
      const newSortButton = (<SortButton
        inputID={sort}
        key={sort}
        displayName={sortFunctions[sort].displayName}
        currentSort={this.props.currentSort}
        handleSortChange={this.handleSortChange}
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
