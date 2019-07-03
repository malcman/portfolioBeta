import React from 'react';
var classNames = require('classnames'); // eslint-disable-line

class Project extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			expanded: false,
			scrollPos: 0,
		}
		this.getTags = this.getTags.bind(this);
		this.handleExpandToggle = this.handleExpandToggle.bind(this);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.getInlineStyles = this.getInlineStyles.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.projRef = React.createRef();
		this.gridCellRef = React.createRef();
	}
	componentDidMount(){
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
		window.addEventListener('scroll', this.handleScroll);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
		window.removeEventListener('scroll', this.handleScroll);
	}
	updateWindowDimensions(e) {
		const newTop = this.gridCellRef.current.getBoundingClientRect().top * -1;
		if (this.state.expanded) {
			this.setState({
				topVal: Math.round(newTop),
			});
		} else {
			this.setState({
				topVal: Math.round(newTop - this.state.scrollPos),
			});
		}
	}

	getTags() {
		// return an unorded list of all tags this project is associated with
		let tags = [];
		this.props.tags.forEach((tag) => {
			tags.push(<li key={tag}>{tag}</li>);
		});
		return (
			<ul className="projTags">
				{tags}
			</ul>
		);
	}

	handleExpandToggle(e) {
		e.stopPropagation();
		// if the close button OR
		// whole project target w/o expanded view OR
		// desktop view and overlay was clicked
		if (e.currentTarget.className === 'projClose' ||
			!this.state.expanded ||
			(window.innerWidth >= 1000 && e.target.id === this.props.titleShort)) {
			this.setState(prevState => ({
				expanded: !prevState.expanded,
			}), () => {
				if (!this.state.expanded) {
					window.scrollTo(0, this.gridCellRef.current.offsetTop - 100, {behavior:'smooth'})
				} else {
					setTimeout(window.scrollTo(0, this.projRef.current.offsetTop, {behavior:'smooth'}), 1000);
				}
			});
		}
	}

	handleScroll() {
		const el = document.scrollingElement || document.documentElement;
		const newScrollPos = el.scrollTop;
		if (!this.state.expanded) {
			this.setState({
				scrollPos: newScrollPos
			});
		}
	}

	getInlineStyles() {
		if (this.state.expanded) {
			return {'top': this.state.topVal};
		}
		return {};
	}

	render() {
		const altText = this.props.titleShort + " cover image";
		const imgID = this.props.titleShort + "CoverIMG";
		const projClass = classNames('project', {'expanded': this.state.expanded});
		const coverDiv = <div className="projbodyCover"></div>
		const closeCover = this.state.expanded ? coverDiv : null;
		const tags = this.getTags();
		const inlineStyles = this.getInlineStyles();

		return (
			<div
				className="projGridCell"
				ref={this.gridCellRef}>
				{closeCover}
				<div
					id={this.props.titleShort}
					className={projClass}
					ref={this.projRef}
					onClick={this.handleExpandToggle}
					style={inlineStyles}>
					<div className="projInfo">
						<div className="projClose"
							onClick={this.handleExpandToggle}>
							<div className="singleToggleLine negFortyFive"></div>
							<div className="singleToggleLine posFortyFive"></div>
						</div>
						<div className="coverPhotoContainer">
							<img
								id={imgID}
								src={this.props.coverIMG}
								alt={altText}
								className="projCoverPhoto"/>
						</div>
						<h4 className="projTitle">{this.props.title}</h4>
						{tags}
						<p className="projDescription">{this.props.description}</p>
						<a className="projReadMore">Read More</a>
					</div>
				</div>
			</div>
		);
	}

}

export default Project;