import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';

const API_KEY = "2d146261b6eec38b5fdeeb844bfc1cbd";

const TVShowInfo = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [error, setError] = useState('');
  const BASE_URL = 'https://api.themoviedb.org/3/tv';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [detailsRes, creditsRes, videosRes] = await Promise.all([
          axios.get(`${BASE_URL}/${id}?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/${id}/credits?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/${id}/videos?api_key=${API_KEY}`)
        ]);

        const trailerVideo = videosRes.data.results.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        );

        setTvShow({
          title: detailsRes.data.name,
          description: detailsRes.data.overview,
          poster: `https://image.tmdb.org/t/p/w500/${detailsRes.data.poster_path}`,
          video: trailerVideo ? `https://www.youtube.com/watch?v=${trailerVideo.key}` : null,
          cast: creditsRes.data.cast.slice(0, 5),
        });

      } catch (err) {
        console.error(err);
        setError("Failed to load show details.");
      }
    };

    fetchDetails();
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!tvShow) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="bg-[#06202B] p-6 text-white min-h-screen">
      <h1 className="text-5xl text-center mb-10">Show Details</h1>

      <div className="flex flex-col lg:flex-row gap-10 mb-12">
        {tvShow.poster && (
          <img
            src={tvShow.poster}
            alt={tvShow.title}
            className="rounded-lg w-full max-w-xs mx-auto lg:mx-0"
          />
        )}
        <div className="flex flex-col gap-4 max-w-3xl justify-center items-center lg:items-start text-center lg:text-left">
          <h2 className="text-3xl font-semibold">{tvShow.title}</h2>
          <p className="text-lg text-gray-300">{tvShow.description}</p>
        </div>
      </div>

      {tvShow.video && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Watch Trailer</h3>
          <div className="w-full md:w-[700px] aspect-video mx-auto rounded-2xl overflow-hidden">
            <ReactPlayer
              url={tvShow.video}
              controls
              width="100%"
              height="100%"
            />
          </div>
        </div>
      )}

      <div>
        <h3 className="text-2xl font-semibold mb-4">Top Cast</h3>
        {tvShow.cast && tvShow.cast.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-lg text-gray-300">
            {tvShow.cast.map((actor) => (
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

export default TVShowInfo;
