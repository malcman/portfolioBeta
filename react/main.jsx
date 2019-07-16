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

// Render Menu and Navigator
ReactDOM.render(
  <App page={getPage()} />,
  document.getElementById('menuEntry'),
);


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

// Copy contact info
const emailBox = document.getElementById('email-box');
if (emailBox) {
  emailBox.addEventListener('click', () => {
    const emailInfo = document.getElementById('email-info');
    copyToClipboard(emailInfo.value);
  });
}
