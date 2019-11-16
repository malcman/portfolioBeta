import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import ClosingX from './ClosingX';

const classNames = require('classnames');

class ProjInfo extends React.Component {
  constructor(props) {
    super(props);
    this.getTags = this.getTags.bind(this);
    this.getDocContents = this.getDocContents.bind(this);
    // dangerouslySetInnerHTML attr requires this weird key structure
    this.state = {
      doc: { __html: '' },
    };
  }

  componentDidMount() {
    this.getDocContents();
  }

  getDocContents() {
    // sets this.state.doc to string containing contents of project document
    fetch(this.props.docURI, { credentials: 'same-origin', 'Content-Type': 'text/html' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.text();
      })
      .then((text) => {
        this.setState({
          doc: { __html: text },
        });
      })
      .catch(error => console.log(error)); // eslint-disable-line no-console
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
    const contentClass = classNames('projContent', { hidden: !this.props.isOpen });
    const closeButtonClass = classNames('projClose', { hidden: !this.props.isOpen });
    const tags = this.getTags();

    return (
      <Flipped flipId={`${this.props.title}Info`} translate>
        <section className="projInfo">
          <ClosingX closerClass="projClose" closerToggle={this.props.handleExpandToggle} />
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
          {/* using innerHTML because I know I am writing these docs
          DO NOT repeat unless entirely confident no XSS is happening.
          aka find a better way to do this */}
          <div className={contentClass} dangerouslySetInnerHTML={this.state.doc} />
          <aside className="projReadMore">Read More</aside>
          <button
            className={closeButtonClass}
            onClick={this.props.handleExpandToggle}
          >
            <p className="projClose">Close Project</p>
            <ClosingX closerClass="projClose" closerToggle={this.props.handleExpandToggle} />
          </button>
        </section>
      </Flipped>
    );
  }
}

export default ProjInfo;
