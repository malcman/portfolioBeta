import React from 'react';
import MenuNav from './MenuNav';

const classNames = require('classnames');

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openNav: false,
      headerClass: null,
      lastScrollPos: 0,
    };
    this.handleToggleNav = this.handleToggleNav.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleHamburgerBlur = this.handleHamburgerBlur.bind(this);
    this.getMenuNav = this.getMenuNav.bind(this);
    this.getBodyCover = this.getBodyCover.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleToggleNav() {
    this.setState(prevState => ({
      openNav: !prevState.openNav,
    }));
  }

  // allow users to push enter on on toggle icon for accessibility
  handleKeyUp(e) {
    if (e.keyCode === 13 || e.which === 13) {
      this.handleToggleNav();
    }
  }

  // handle blurring of hamburger menu to avoid unexpected behavior
  handleHamburgerBlur() {
    if (!this.state.openNav) {
      this.handleToggleNav();
    }
  }

  getMenuNav() {
    // set navClass
    const navClass = this.state.openNav ? 'openNav' : 'hiddenRight';
    let nav;
    if (this.props.currentPage) {
      nav = (<MenuNav
        navClass={navClass}
        toggleHandler={this.handleToggleNav}
        currentPage={this.props.currentPage}
        handlePageChange={this.props.handlePageChange}
      />);
    } else {
      nav = null;
    }
    return nav;
  }

  getBodyCover() {
    if (this.props.windowWidth < 650) {
      // determine if bodyCover div will be hidden or not and apply classes
      const hidden = this.state.openNav ? '' : 'hidden';
      const coverClasses = `bodyCover ${hidden}`;
      const bodyCover = (<div
        className={coverClasses}
        onClick={this.handleToggleNav}
        role="button"
        tabIndex="0"
      />);
      return bodyCover;
    }
    return null;
  }

  handleScroll() {
    const el = document.scrollingElement || document.documentElement;
    const newScrollPos = el.scrollTop;
    if ((newScrollPos < 100 && newScrollPos > this.state.lastScrollPos) ||
      newScrollPos <= 0) {
      this.setState({
        headerClass: null,
      });
      return;
    }

    // scrolling down - default
    let newHeaderClass = null;

    // if not desktop
    if (this.props.windowWidth < 1000) {
      // scrolling up
      if (newScrollPos < this.state.lastScrollPos) newHeaderClass = 'fixedHeader';
    }
    // update state to match new scroll position
    this.setState({
      headerClass: newHeaderClass,
      lastScrollPos: newScrollPos,
    });
  }

  render() {
    const nav = this.getMenuNav();
    const bodyCover = this.getBodyCover();
    const toggleLineClass = classNames('singleToggleLine', { lineUnder: this.state.openNav });
    // change homelink src if wide enough screen
    let imgSRC = './static/img/MalcMaturenCrop.png';
    if (this.props.windowWidth > 1000) {
      imgSRC = './static/img/MalcMaturenFull.png';
    }

    return (
      <header className={this.state.headerClass}>
        <svg id="headerSVG" height="200" width="100%">
          <polygon className="mobileSVG" points="0,0 0,140 70,85 1000,85 1000,0" />
          <polygon className="tabletSVG" points="0,0 0,140 20,140 90,90 1000,85 1000,0" />
          <polygon className="desktopSVG" points="0,0 0,200 40,200 120,120 1500,85 1500,0" />
        </svg>
        <div id="titleLink">
          <a href="index.html" id="homelink" tabIndex="1">
            <img
              src={imgSRC}
              alt="Malcolm Maturen Logo"
            />
          </a>
          <div
            id="toggle"
            onClick={this.handleToggleNav}
            onBlur={this.handleHamburgerBlur}
            onKeyUp={this.handleKeyUp}
            tabIndex="2"
            role="button"
          >
            <div className={toggleLineClass} id="toggleLine1" />
            <div className={toggleLineClass} id="toggleLine2" />
            <div className={toggleLineClass} id="toggleLine3" />
          </div>
        </div>
        {nav}
        {bodyCover}
      </header>
    );
  }
}

export default MenuBar;
