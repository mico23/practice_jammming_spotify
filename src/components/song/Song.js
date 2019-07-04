import React from 'react';
import './Song.css';

class Song extends React.Component {
  constructor(props) {
    super(props);

    this.handleExpansion = this.handleExpansion.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleExpansion(e) {
    this.props.addSong(this.props.song);
    e.preventDefault();
  }

  handleRemove(e){
    this.props.removeSong(this.props.song);
    e.preventDefault();
  }

  //check whether which edit function is passed ***
  //before render the edit button
  render() {
    let editButton;

    if (this.props.addSong) {
      editButton = <a className="Track-action" onClick={this.handleExpansion}>+</a>
    } else {
      editButton = <a className="Track-action" onClick={this.handleRemove}>-</a>
    }

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.song.name}</h3>
          <p>{`${this.props.song.artist} | ${this.props.song.album}`}</p>
          <p>THE FOLLOWING INFO IS FOR TESTING PURPOSE</p>
        </div>
        {editButton}
      </div>
    );
  }
}

export default Song;
