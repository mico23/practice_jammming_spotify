import React from 'react';
import './PlayList.css';
import Song from '../song/Song.js';

class PlayList extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.changePlaylistName(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue="New Playlist" onChange={this.handleNameChange}/>
        <div className="TrackList">
          {
            this.props.playlist.map(track => {
              return <Song removeSong={this.props.removeSong} song={track} key={track.id} testing={this.props.playlist}/>
            })
          }
        </div>
        <a className="Playlist-save" onClick={this.props.savePlayList}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default PlayList;
