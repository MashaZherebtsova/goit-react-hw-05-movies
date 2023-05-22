import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MovieLink, MovieList, Title } from './Home.styled';
import { getTrending } from '../Api/Api';

const Home = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTrending().then(data => {
      setTrendMovies(data.results);
    });
  }, []);

  return (
    <main>
      <Title> Trending today</Title>
      <MovieList>
        {trendMovies.map(movie => (
          <li key={movie.id}>
            <MovieLink to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.original_title || movie.name}
            </MovieLink>
          </li>
        ))}
      </MovieList>
    </main>
  );
};
export default Home;