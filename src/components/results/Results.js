import React from 'react';
import './Results.css';
import Song from '../song/Song.js';

class Results extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <div className="TrackList">
          {
            this.props.trackList.map(song => {
              return <Song song={song} key={song.id} addSong={this.props.addSong}/>
            })
          }
        </div>
      </div>
    );
  }
}

export default Results;
