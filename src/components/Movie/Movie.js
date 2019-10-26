import React from 'react';
import './Movie.css';
import UserScore from './UserScore';

class Movie extends React.Component {
    render() {
        return (
                <div className="movie">
                    <div className="image-container">
                        <img src={this.props.poster} alt={this.props.title}/>
                    </div>
                    <div className="info">
                        <div className="info-wrapper">
                            <div className="user-score" >
                                <UserScore vote_average={this.props.vote_average} id={this.props.id} />
                            </div>
                            <div className="flex">
                                <div className="title">{this.props.title}</div>
                                <div className="release-date">{this.props.release_date}</div>
                            </div>
                        </div>
                        <div className="overview"><p>{this.props.overview}</p></div>
                        <div className="view-more">
                            <small className="text-muted"><a>More Info</a></small>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Movie;