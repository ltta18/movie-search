const apiKey = "50b6446d9eb4ff37b9fad7067f447b88";
// add page also

const date_format = (date) => {
    var d = new Date(date); 
    return d.toDateString().slice(4,);
}

const no_overview = "We don't have an overview translated in English. Help us expand our database by adding one.";

const SearchMovie = { 
    search (title, media_type) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/search/${media_type}?api_key=${apiKey}&language=en-US&query=${encodeURI(title)}`,{
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.results) {
                return jsonResponse.results.map(movie => ({
                    id: movie.id,
                    poster: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                    title: movie.original_title,
                    overview: movie.overview ? movie.overview : no_overview,
                    release_date: date_format(movie.release_date),
                    popularity: movie.popularity,
                    vote_average: movie.vote_average,
                    vote_count : movie.vote_count,
                    media_type: movie.media_type
                }));
            }
        });
    }
}

export default SearchMovie;