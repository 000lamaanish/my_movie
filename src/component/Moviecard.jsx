import "../css/MovieCard.css";

const Moviecard = ({ movie }) => {
    function onFavouriteClick() {
        alert(`${movie.title} added to favourites!`);
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <div className="favourite">
                    <button className="fav-btn" onClick={onFavouriteClick}>🤍</button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
            </div>
        </div>
    );
}

export default Moviecard;
