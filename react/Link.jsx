import React from 'react';

function Link(props) {
  return (
    <a
      onBlur={props.toggleHandler}
      href={props.htmlPage}
      tabIndex={props.tabIndex}
    >
      <li id={props.liID} className={props.classsName} >
        <div>
          <h2>{props.name}</h2>
        </div>
      </li>
    </a>
  );
}

export default Link;
