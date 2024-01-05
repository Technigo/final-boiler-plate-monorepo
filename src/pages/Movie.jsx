import { useEffect, useState } from 'react';
import { movieStore } from '../store/movieStore';
import { MovieDetails } from '../components/MovieDetails';
import { useParams, Link } from 'react-router-dom';

export const Movie = () => {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const fetchMovies = movieStore((state) => state.fetchMovies);
  const movies = movieStore((state) => state.movies);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchMovies(); // Load videos every time the component renders
        const movie = movies.find((m) => m._id.$oid === id);

        if (movie) {
          setMovieData(movie);
          setIsLoading(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          console.error('Movie not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, fetchMovies, movies]);

  return (
    <>
      {!isLoading && movieData && (
        <Link className="back-arrow" to="/">
          Back to home page
        </Link>
      )}
      {!isLoading && movieData && <MovieDetails movie={movieData} />}
    </>
  );
};
