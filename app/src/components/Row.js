import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Row.css';

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const base_URL = 'https://image.tmdb.org/t/p/original/';

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/${fetchUrl}`
      );
      //https://api.themoviedb.org/3/
      console.log(request.data.results);
      setMovies(request.data.results);
      console.table(movies);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <img
              className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
              key={movie.id}
              src={`${base_URL}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Row;
