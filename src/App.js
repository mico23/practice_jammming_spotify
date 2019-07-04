//import React, { Component } from 'react';
import React from 'react';
import './App.css';
import SearchBar from './components/search_bar/SearchBar.js';
import Playlist from './components/play_list/PlayList.js';
import Results from './components/results/Results.js';
import Spotify from './util/Spotify.js'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trackList: [],
      playlistName: '',
      playlist: []
    };

    this.addSong = this.addSong.bind(this);
    this.removeSong = this.removeSong.bind(this);
    this.changePlaylistName = this.changePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }


  addSong(song) {
    let expandPlaylist = this.state.playlist;
    if (!expandPlaylist.includes(song)) {
      // remove the song.id?
      // by adding .id, the function will add duplicated items
      // includes() cannot compare the porperties inside an object with the provided value
        expandPlaylist.push(song);

    let reduceResult = this.state.trackList;
    this.setState({trackList: reduceResult.filter(currentTrack => currentTrack.id !== song.id)});
    }
    this.setState({playlist: expandPlaylist});
    //console.log(this.state.playlist);
  }


//how to make 'song' as a dynamic input?
//when the list is loaded, the index will be set and fixed?
//so when the list is updated, the index is wrong?

  removeSong(song) {
    let reducePlaylist = this.state.playlist;

    this.setState({playlist: reducePlaylist.filter(currentTrack => currentTrack.id !== song.id)});

    let updateResult = this.state.trackList;
    this.setState({trackList: updateResult.concat(song)});
    //show avoid using .push here.
    //.push mutates the original arrary
    //console.log(this.state.trackList);
  }

  changePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlist.map(track => {
      return track.uri;
    });

    Spotify.savePlaylist(this.state.playlistName, trackUris);

    this.changePlaylistName('');
    this.setState({tracklist: []});
    this.setState({playlist: []});
    console.log(trackUris);
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({trackList: tracks});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSong={this.search}/>
          <div className="App-playlist">
            <Results trackList={this.state.trackList} addSong={this.addSong}/>
            <Playlist playlistName={this.state.playlistName}
            playlist={this.state.playlist}
            changePlaylistName={this.changePlaylistName}
            removeSong={this.removeSong} savePlaylist={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
