import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchMovie from './util/api';
import MovieList from './components/MovieList/MovieList';
import NavBar from './components/NavBar/NavBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };

    this.search = this.search.bind(this);
  }

  search(title, media_type="movie") {
    SearchMovie.search(title, media_type).then(results => {
      this.setState({results: results})
    })
  }

  render() {
    return (
      <div className="App">
        <div className="menu">
          <NavBar />
          <SearchBar search={this.search} results={this.state.results}/>
        </div>
        <MovieList movies={this.state.movies} />
        <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
      </div>
      
    )
  }
}

export default App;
