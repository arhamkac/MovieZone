import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = "2d146261b6eec38b5fdeeb844bfc1cbd";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [detailsRes, creditsRes, videosRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
        ]);

        const trailer = videosRes.data.results.find(
          v => v.site === 'YouTube' && v.type === 'Trailer'
        );

        setMovie(detailsRes.data);
        setCast(creditsRes.data.cast.slice(0, 5));
        setTrailerKey(trailer ? trailer.key : '');
      } catch (err) {
        console.error(err);
        setError('Failed to load movie details.');
      }
    };

    fetchDetails();
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!movie) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="bg-[#06202B] p-5 text-white min-h-screen">
      <h1 className="text-5xl text-center mb-10">Movie Details</h1>

      <div className="flex flex-col lg:flex-row gap-10 mb-12">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg w-full max-w-xs mx-auto lg:mx-0"
        />
        <div className="flex flex-col gap-4 max-w-3xl justify-center items-center">
          <h2 className="text-3xl font-semibold">{movie.title}</h2>
          <p className="text-lg text-gray-300">{movie.overview}</p>
        </div>
      </div>

      {trailerKey && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Watch Trailer</h3>
          <div className="w-full md:w-[700px] aspect-video mx-auto">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              className="w-full h-full rounded-lg"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        </div>
      )}

      <div>
        <h3 className="text-2xl font-semibold mb-4">Top Cast</h3>
        {cast.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-lg text-gray-300">
            {cast.map(actor => (
              <li key={actor.id}>
                <strong>{actor.name}</strong> as {actor.character}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No cast information available.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
