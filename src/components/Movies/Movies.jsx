import { MovieList, MovieLink } from '../Home/Home.styled';
import { useState, useEffect } from 'react';
import { searchMovies } from './../Api/Api';
import { useSearchParams, useLocation } from 'react-router-dom';
import { SearchBar } from './../../components/SearchBar/SearchBar';

const Movies = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('movieName') ?? '';
  const [moviesList, setMoviesList] = useState([]);

  const [error, setError] = useState(false);

  useEffect(() => {
    if (movieName === '') {
      return;
    }
    setMoviesList([]);

    searchMovies(movieName).then(data => {
      if (!data.results.length) {
        setError(true);
        return console.log(
          'There is no movies with this request. Please, try again'
        );
      }
      setError(false);
      setMoviesList(data.results);
    });
  }, [movieName]);

  const handleSubmit = e => {
    e.preventDefault();
    const searchForm = e.currentTarget;
    setSearchParams({ movieName: searchForm.elements.movieName.value });
    searchForm.reset();
  };
  return (
    <main>
      <SearchBar onSubmit={handleSubmit} />
      {error && <p>There is no movies with this request. Please, try again</p>}
      <MovieList>
        {moviesList.map(movie => {
          return (
            <li key={movie.id}>
              <MovieLink to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.original_title || movie.name}
              </MovieLink>
            </li>
          );
        })}
      </MovieList>
    </main>
  );
};

export default Movies;
