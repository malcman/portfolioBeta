import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'


function getPage(){
	const regex = /-\s*(\w+)/;
	let matches = regex.exec(document.title);
	let page;

	if ((matches = regex.exec(document.title)) !== null) {
		// The result can be accessed through the `m`-variable.
		matches.forEach((match, groupIndex) => {
			if (groupIndex === 1) {
				page = match;
			}
		});
	}
	return page;
}


ReactDOM.render(
  <App page={getPage()}/>,
  document.getElementById('menuEntry'),
);

const projectEntry = document.getElementById('projectEntry')
if (projectEntry) {
	ReactDOM.render(<ProjectPage/>, projectEntry);
}
