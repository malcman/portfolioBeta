import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import ProjInfo from './ProjInfo';

const classNames = require('classnames');

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      scrollPos: 0,
      styles: {
        top: 0,
      },
    };
    this.handleExpandToggle = this.handleExpandToggle.bind(this);
    this.toggleExpandCallback = this.toggleExpandCallback.bind(this);
    this.updateTopValue = this.updateTopValue.bind(this);
    this.getInlineStyles = this.getInlineStyles.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.projRef = React.createRef();
    this.gridCellRef = React.createRef();
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateTopValue);
    window.addEventListener('scroll', this.handleScroll);
    this.updateTopValue();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateTopValue);
    window.removeEventListener('scroll', this.handleScroll);
  }
  updateTopValue() {
    // set top state value as distance from parent grid cell to top of viewport
    // if card is expanded, don't factor in scroll position
    let newTop = this.gridCellRef.current.getBoundingClientRect().top * -1;
    if (!this.state.expanded) newTop -= this.state.scrollPos;

    this.setState(prevState => ({
      styles: {
        ...prevState.styles,
        ['top']: Math.round(newTop), // eslint-disable-line
      },
    }));
  }

  handleExpandToggle(e) {
    e.stopPropagation();
    this.updateTopValue();
    // if the close button OR
    // whole project target w/o expanded view OR
    // desktop view and overlay was clicked
    if (e.currentTarget.className === 'projClose' ||
      !this.state.expanded ||
      (window.innerWidth >= 1000 && e.target.id === this.props.titleShort)) {
      // remove "fixed" position effects
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';

      this.setState(prevState => ({
        expanded: !prevState.expanded,
      }), this.toggleExpandCallback);
    }
  }

  toggleExpandCallback() {
    // scroll to project grid cell after close
    if (!this.state.expanded) {
      window.scrollTo(0, this.gridCellRef.current.offsetTop - 100, { behavior: 'smooth' });
      setTimeout(() => {
        this.updateTopValue();
      }, 200);

    // scroll to viewport top upon expansion
    } else {
      // scroll to top of window
      setTimeout(() => {
        window.scrollTo(0, 0, { behavior: 'smooth' });
      });

      // make it appear "fixed" at top
      // yes kind of hacky but pos: fixed keeps bullocksing everything up
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    }
  }

  handleScroll() {
    const el = document.scrollingElement || document.documentElement;
    const newScrollPos = el.scrollTop;
    if (!this.state.expanded) {
      this.setState({
        scrollPos: newScrollPos,
      });
    }
  }

  getInlineStyles() {
    if (this.state.expanded) {
      return this.state.styles;
    }
    return {};
  }

  render() {
    const projClass = classNames('project', { expanded: this.state.expanded });
    const coverDiv = (<div
      className="projBodyCover"
      onClick={this.handleExpandToggle}
      role="button"
      tabIndex="0"
    />);
    const inlineStyles = this.getInlineStyles();

    return (
      <Flipped flipId={this.props.titleShort} >
        <div
          className="projGridCell"
          ref={this.gridCellRef}
        >
          <div
            id={this.props.titleShort}
            className={projClass}
            ref={this.projRef}
            onClick={this.handleExpandToggle}
            style={inlineStyles}
            role="button"
            tabIndex="0"
          >
            <ProjInfo
              handleExpandToggle={this.handleExpandToggle}
              {...this.props}
            />
          </div>
          {coverDiv}
        </div>
      </Flipped>
    );
  }
}

export default Project;
