import React from 'react';
import './MovieList.css';
import Movie from '../Movie/Movie';

class MovieList extends React.Component {
    render() {
        return (
            <div className="movie-list">
                {/* if users enter empty str, return '' */}
                {this.props.movies ?
                    this.props.movies.map(movie => {
                        return <Movie movie={movie} id={movie.id} title={movie.title} overview={movie.overview} 
                        poster={movie.poster} release_date={movie.release_date} vote_average={movie.vote_average}/>
                    }) :
                    ''
                }
            </div>
        )
    }
}

export default MovieList;