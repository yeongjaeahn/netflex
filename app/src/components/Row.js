import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [show, setShow] = useState(false);

  const base_URL = 'https://image.tmdb.org/t/p/original/';

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/${fetchUrl}`
      );
      //https://api.themoviedb.org/3/

      setMovies(request.data.results);

      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      setShow(true);
      movieTrailer(
        movie?.name || '' || movie.name || toString(movie?.original_name)
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);

          setTrailerUrl(urlParams.get('v'));
        })

        .catch((error) => console.log(error));
      if (!!movieTrailer === show) {
        setShow(false);
      }
    }
  };
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
              onClick={() => {
                handleClick(movie);
              }}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      {show && <YouTube opts={opts} />}
    </div>
  );
}

export default Row;
