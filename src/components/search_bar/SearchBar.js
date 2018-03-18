import React from 'react';
import './SearchBar.css';

let searchTerm = undefined;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.saveSearchTerm = this.saveSearchTerm.bind(this);
  }

  saveSearchTerm(e) {
    searchTerm = e.target.value;
  }

  search(term) {
    this.props.searchSong(term);
  }

  handleSearch(e) {
    this.search(searchTerm);
  }



  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song Title" onChange={this.saveSearchTerm}/>
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
