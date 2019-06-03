// SearchBar.js
import React from "react";

class SearchBar extends React.Component {
	constructor(props){
		super(props);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
	}

	handleFilterTextChange(e) {
		this.props.onFilterTextChange(e.target.value);
	}

	render() {
		const filterText = this.props.filterText;

		return (
			<form id='searchForm' autoComplete="off">
				<input
					id='query'
					type="text"
					placeholder="Search Project Titles"
					autoComplete="off"
					value={filterText}
					onChange={this.handleFilterTextChange}/>
			</form>
		);
	}
}


export default SearchBar