import React from 'react';
import PropTypes from 'prop-types';
import Project from './Project.jsx'; // eslint-disable-line

class Gallery extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
		const galleryClasses = 'gallery ' + this.props._className;
		return (
			<div className={galleryClasses}>
				{this.props.pieces}
			</div>
		);
	}

}

Gallery.propTypes = {
	pieces: PropTypes.arrayOf(PropTypes.element),
}

export default Gallery;