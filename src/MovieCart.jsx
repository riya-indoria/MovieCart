import React, { useState, useEffect } from 'react';
import './MovieCart.css';
import './nav.css';

const MovieCart = () => {
  const [search, setSearch] = useState("Avengers");
  const [menuOpen, setMenuOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    if (!search) return;

    setLoading(true);
    const res = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=70b40d03`);
    const data = await res.json();
    console.log(data);
    setMovies(data.Search || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [search]);

  const changeHandle = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <>
      <nav className="nav">
        <div className="container">
          <div className="logo"></div>

          <div className={`main_list ${menuOpen ? "show_list" : ""}`}>
            <ul className="navlinks">
              <li><a href="/">Home</a></li>
              <li><a href="#">New</a></li>
              <li><a href="#">Category</a></li>
              <li><a href="#">Language</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="home"></section>

      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Search movie here" value={search} onChange={changeHandle} />
      </form>

      <br />

      <div className="movie-cards-container flex">
        {loading ? (
          <p>Loading...</p>
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-card section p-2"
              style={{ cursor: "pointer" }}
              onClick={() =>
                window.open(`https://www.imdb.com/title/${movie.imdbID}`, "_blank")
              }
            >
              <div className="movie-image">
                <img src={movie.Poster} alt={movie.Title} />
              </div>

              <div className="movie-details">
                <i className="txt">Movie: {movie.Title}</i><br />
                <i className="txt">Year: {movie.Year}</i><br />
                <i className="txt">Type: {movie.Type}</i>
              </div>
            </div>
          ))
        ) : (
          <p>Please enter at least 3 characters</p>
        )}
      </div>
    </>
  );
};

export default MovieCart;
