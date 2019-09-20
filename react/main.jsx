import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProjectPage from './ProjectPage';


function getPage() {
  const regex = /-\s*(\w+)/;
  const matches = regex.exec(document.title);
  let page;

  if (matches !== null) {
    // The result can be accessed through the `m`-variable.
    matches.forEach((match, groupIndex) => {
      if (groupIndex === 1) {
        page = match;
      }
    });
  }
  return page;
}


// Render Projects Page
const projectsEntry = document.getElementById('projectsEntry');
if (projectsEntry) {
  ReactDOM.render(<ProjectPage />, projectsEntry);
}

function copyToClipboardFallback(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.log('Oops, unable to copy'); // eslint-disable-line
  }
  document.body.removeChild(textArea);
}

function copyToClipboard(text) {
  if (!navigator.clipboard) {
    copyToClipboardFallback(text);
    return;
  }
  navigator.clipboard.writeText(text);
}

function expand(expandableEl, expandingEl) {
  // already expanded, so close it
  if (expandableEl.classList.contains('expanded')) {
    expandableEl.classList.remove('expanded');
    // replace with desire default margin
    expandableEl.style.marginBottom = '0'; //eslint-disable-line

  // close, so expand it
  } else {
    expandableEl.classList.add('expanded');
    // determine appropriate distance to push following elements down
    const marginSize = expandingEl.clientHeight;
    const marginPxStr = `${marginSize}px`;
    // apply
    expandableEl.style.marginBottom = marginPxStr; //eslint-disable-line
    setTimeout(() => {
      window.scrollTo(0, expandableEl.offsetTop, { behavior: 'smooth' });
    }, 400);
  }
}

function enableExpansions() {
  // get all expandable elements
  const expandables = document.querySelectorAll('.expandable');
  expandables.forEach((expandable) => {
    // get associated child elements that do the actual expanding
    const expanding = expandable.querySelector('.expanding');
    // add click listeners to all
    expandable.addEventListener('click', () => {
      expand(expandable, expanding);
    });
  });
}

function setHeights() {
  // this function is necessary bc transform needs a height set first in order to work effectively
  const expandables = document.querySelectorAll('.expandable');
  expandables.forEach((expandable) => {
    const expanding = expandable.querySelector('.expanding');
    const content = expanding.querySelector('.expandContent');
    expanding.style.height = `${content.clientHeight}px`;
  });
}

// enable all non-react expandable sections
setHeights();
enableExpansions();

// Render Menu and Navigator
ReactDOM.render(
  <App page={getPage()} />,
  document.getElementById('menuEntry'),
);

// Copy contact info
const emailBox = document.getElementById('email-box');
if (emailBox) {
  emailBox.addEventListener('click', () => {
    const emailInfo = document.getElementById('email-info');
    copyToClipboard(emailInfo.value);
  });
}
