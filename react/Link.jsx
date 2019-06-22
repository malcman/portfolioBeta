import React from 'react';

class Link extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<a
				onBlur={this.props.toggleHandler}
				href={this.props.htmlPage}
				tabIndex={this.props.tabIndex}>
				<li
					id={this.props.liID}
					className={this.props.className_}>
					<div>
						<h2>{this.props.name}</h2>
					</div>
				</li>
			</a>
		);
	}
}

export default Link;