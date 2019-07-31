import React from 'react';

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
    const tags = this.getTags();

    return (
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
        <h4 className="projTitle">{this.props.title}</h4>
        {tags}
        <p className="projDescription">{this.props.description}</p>
        <aside className="projReadMore">Read More</aside>
      </section>
    );
  }
}

export default ProjInfo;
