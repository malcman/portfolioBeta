import React from 'react';
import Link from './Link';

class MenuNav extends React.Component {
  constructor(props) {
    super(props);
    this.pageNames = ['Home', 'Resume', 'Projects', 'Art', 'Contact'];
    this.state = {
      links: [],
    };
    this.createLinks = this.createLinks.bind(this);
    this.getClassName = this.getClassName.bind(this);
  }

  static getHTMLFileName(pageName) {
    // helper function for creating Link components
    // assumes pageName is one word
    // returns lowercase pageName.html
    // if pageName is 'Home' returns index.html
    if (pageName === 'Home') {
      return 'index.html';
    }
    return `${pageName.toLowerCase()}.html`;
  }

  static getNavID(pageName) {
    // helper function for creating Link components
    // assumes pageName is one word
    // returns lowercase navpageName
    return `nav${pageName.toLowerCase()}`;
  }

  componentDidMount() {
    this.createLinks();
  }

  createLinks() {
    // create relevant props for Link components pased off this.pageNames
    // fill this.state.links with Link components
    // tabIndex starts at 3 due to homelink and toggle menu being 1 & 2
    let tabIndex = 3;
    const newLinks = [];

    // iterate through known existing pageNames
    this.pageNames.forEach((pageName) => {
      const navID = MenuNav.getNavID(pageName);
      const fileName = MenuNav.getHTMLFileName(pageName);
      const className = this.getClassName(pageName);
      let handler = () => {};
      if (pageName === 'Contact') {
        handler = this.props.toggleHandler;
      }
      const newLink = (<Link
        key={tabIndex}
        tabIndex={tabIndex}
        classsName={className}
        liID={navID}
        htmlPage={fileName}
        toggleHandler={handler}
        name={pageName}
        handlePageChange={this.props.handlePageChange}
      />);
      newLinks.push(newLink);
      tabIndex += 1;
    });

    this.setState({
      links: newLinks,
    });
  }

  getClassName(pageName) {
    if (pageName === this.props.currentPage) {
      return 'current-page';
    }
    return '';
  }

  render() {
    let toggleLineClass = 'singleToggleLine';
    if (this.props.navClass === 'openNav') {
      toggleLineClass = 'singleToggleLine lineOver';
    }

    return (
      <div id="menu-container" className={this.props.navClass}>
        <div
          id="close"
          onClick={this.props.toggleHandler}
          role="button"
          tabIndex="0"
        >
          <div className={toggleLineClass} id="toggleLine4" />
          <div className={toggleLineClass} id="toggleLine5" />
        </div>
        <nav id="menu">
          <ul>
            {this.state.links}
          </ul>
        </nav>
      </div>
    );
  }
}

export default MenuNav;
