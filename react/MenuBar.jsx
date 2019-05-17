import React from 'react';
import MenuNav from './MenuNav';

class MenuBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openNav: false,
		}
		this.handleToggleNav = this.handleToggleNav.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleHamburgerBlur = this.handleHamburgerBlur.bind(this);
		this.getMenuNav = this.getMenuNav.bind(this);
		this.getBodyCover = this.getBodyCover.bind(this);
	}

	handleToggleNav() {
		this.setState(prevState =>({
			openNav: !prevState.openNav
		}));
	}

	// allow users to push enter on on toggle icon for accessibility
	handleKeyUp(e) {
		if (e.keyCode === 13) {
			this.handleToggleNav();
		}
	}

	// handle blurring of hamburger menu to avoid unexpected behavior
	handleHamburgerBlur() {
		if (!this.state.openNav) {
			this.handleToggleNav()
		}
	}

	getMenuNav() {
		// set navClass
		const navClass = this.state.openNav ? "openNav":"hiddenRight";
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
			var hidden = this.state.openNav ? "":"hidden";
			var coverClasses = `bodyCover ${hidden}`;
			var bodyCover = (<div
													className={coverClasses}
													onClick={this.handleToggleNav}>
												</div>);
		}
		return bodyCover;
	}

	render() {

		const nav = this.getMenuNav();
		const bodyCover = this.getBodyCover();
		let toggleLineClass = "singleToggleLine";
		if (this.state.openNav) {
			toggleLineClass = "singleToggleLine lineUnder"
		}

		return (
			<header>
				<div id="titleLink">
					<a href="index.html" id="homelink" tabIndex="1">
						<img src="./static/img/MalcMaturenCrop.png" alt="Malcolm Maturen Logo"/>
					</a>
					<div id="toggle"
						onClick={this.handleToggleNav}
						onBlur={this.handleHamburgerBlur}
						onKeyUp={this.handleKeyUp}
						tabIndex="2">
						<div className={toggleLineClass}
							id="toggleLine1"></div>
						<div className={toggleLineClass}
							id="toggleLine2"></div>
						<div className={toggleLineClass}
						id="toggleLine3"></div>
					</div>
				</div>
				{nav}
				{bodyCover}
			</header>
		);
	}
}

// <img id="toggleSVG"
// 	src="./static/img/menuBars1.png"/>

export default MenuBar;