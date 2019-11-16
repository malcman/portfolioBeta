import React from 'react';

const classNames = require('classnames');

function ClosingX(props) {
  return (
    <div
      className={classNames(props.closerClass, 'ClosingX')}
      onClick={props.closerToggle}
      role="button"
      tabIndex="0"
    >
      <div className="singleToggleLine negFortyFive" />
      <div className="singleToggleLine posFortyFive" />
    </div>
  );
}

export default ClosingX;
