import React from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';

const classNames = require('classnames');

class ProjInfo extends React.Component {
  constructor(props) {
    super(props);
    this.getTags = this.getTags.bind(this);
  }

  getTags() {
    // return an unordered list of all tags this project is associated with
    const tags = [];
    if (this.props.tags) {
      this.props.tags.forEach((tag) => {
        tags.push(<li key={tag}>{tag}</li>);
      });
    }
    return (
      <ul className="projTags">
        {tags}
      </ul>
    );
  }

  render() {
    const altText = `${this.props.titleShort} cover image`;
    const imgID = `${this.props.titleShort}CoverIMG`;
    const contentClass = classNames({ hidden: !this.props.isOpen });
    const tags = this.getTags();

    return (
      <Flipped flipId={`${this.props.title}Info`} translate>
        <section className="projInfo">
          <div
            className="projClose"
            onClick={this.props.handleExpandToggle}
            role="button"
            tabIndex="0"
          >
            <div className="singleToggleLine negFortyFive" />
            <div className="singleToggleLine posFortyFive" />
          </div>
          <div className="coverPhotoContainer">
            <img
              id={imgID}
              src={this.props.coverIMG}
              alt={altText}
              className="projCoverPhoto"
            />
          </div>
          <h2 className="projTitle">{this.props.title}</h2>
          {tags}
          <object className={contentClass} data={this.props.docURI} type="text/html">
            Sorry, your browser does not support the object tag.
          </object>
          <aside className="projReadMore">Read More</aside>
        </section>
      </Flipped>
    );
  }
}

export default ProjInfo;
