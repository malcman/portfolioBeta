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
  // creates a textarea element, quickly selects the text, then deletes node
  const textArea = document.createElement('textarea');
  textArea.value = text;
  // specify fixed position to viewport so that
  // adding element to document doesn't affect scroll position
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.classList.add('hiddenRight');
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
  let clipboardAccess = false;
  if (navigator.permissions) {
    navigator.permissions.query({ name: 'clipboard-write' })
      .then((result) => {
        if (result.state === 'granted' || result.state === 'prompt') {
          // granted access
          clipboardAccess = true;
        }
      });
  }
  if (!clipboardAccess || !navigator.clipboard) {
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
    const marginSize = expandingEl.clientHeight + 10;
    const marginPxStr = `${marginSize}px`;
    // apply
    expandableEl.style.marginBottom = marginPxStr; //eslint-disable-line
    // setTimeout(() => {
    //   window.scrollTo(0, expandableEl.offsetTop, { behavior: 'smooth' });
    // }, 400);
  }
}

function enableExpansions() {
  // get all expandable elements
  const expandables = document.querySelectorAll('.expandable');
  expandables.forEach((expandable) => {
    // get associated child elements that do the actual expanding
    const expanding = expandable.querySelector('.expanding');
    const header = expandable.children[0];
    // add click listeners to all
    // only allow clicks on the header bars
    header.addEventListener('click', () => {
      expand(expandable, expanding);
    });
  });
}

// function setHeights() {
//   // this function is necessary bc transform needs a height set first in order to work effectively
//   // sike I don't think that's true
//   const expandables = document.querySelectorAll('.expandable');
//   expandables.forEach((expandable) => {
//     const expanding = expandable.querySelector('.expanding');
//     const content = expanding.querySelector('.expandContent');
//     expanding.style.height = `${content.clientHeight}px`;
//   });
// }

// enable all non-react expandable sections
// setHeights();
enableExpansions();

// Render Menu and Navigator
ReactDOM.render(
  <App page={getPage()} />,
  document.getElementById('menuEntry'),
);

// Copy contact info
const copyables = document.querySelectorAll('.copyable');
if (copyables) {
  copyables.forEach((copyable) => {
    copyable.addEventListener('click', () => {
      const copyText = copyable.getAttribute('copyText');
      copyToClipboard(copyText);
    });
  });
}
