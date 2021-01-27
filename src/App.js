import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SearchBar from './components/SearchBar/SearchBar';
import SearchMovie from './util/api';
import MovieList from './components/MovieList/MovieList';
import NavBar from './components/NavBar/NavBar';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };

    this.search = this.search.bind(this);
  }

  search(title, media_type="movie") {
    SearchMovie.search(title, media_type).then(movies => {
      this.setState({movies: movies})
    })
  }

  render() {
    return (
      // <div className="App">
      //   <div className="menu">
      //     <NavBar />
      //     <SearchBar search={this.search} movies={this.state.movies}/>
      //   </div>
      //   <MovieList movies={this.state.movies} />
      // </div>
      <Router>
        <div id="menu">
          <NavBar />
          <SearchBar search={this.search} movies={this.state.movies}/>
        </div>
        <div id="route">
          <Route path="/" />
          <Route path="/movies" render={() => (<MovieList movies={this.state.movies} />)} />
        </div>
      </Router>
    )
    
  }
}

export default App;
