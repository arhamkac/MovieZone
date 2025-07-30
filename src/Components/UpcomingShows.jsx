import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpcomingShows = () => {
  const [shows, setShows] = useState([]);
  const BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = "2d146261b6eec38b5fdeeb844bfc1cbd";
  const ENDPOINT = '/tv/on_the_air';
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${ENDPOINT}`, {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            page: page,
          }
        });
        const data = response.data;
        setShows(data.results);
      }
      catch (error) {
        console.error('Error fetching shows:', error);
      }
    };
    fetchShows();
  }, [page]);

  const handleClick = (id) => {
    navigate(`/tv/${id}`);
  };

  const formatDat = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

  return (
    <div className='bg-[#06202B] p-5 min-h-screen'>
      <h1 className='text-5xl justify-center items-center flex py-6 text-white'>TV Shows Airing Today</h1>

      {/* TV Show Cards */}
      <div className="grid grid-cols-5 gap-5">
        {shows.map((show) => (
          <div key={show.id} className='bg-gray-800 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform' onClick={() => handleClick(show.id)}>
            <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.title} className='rounded-lg' />
            <h2 className='text-white text-xl'>{show.name}</h2>
            <p className='text-gray-400'>{formatDat(show.first_air_date)}</p>
            <p className='text-gray-400'>{show.overview}</p>
            <p className='text-yellow-500'>Rating: {show.vote_average}</p>
          </div>
        ))}
      </div>

      <div className='flex flex-col items-center justify-center gap-4 mt-10 text-white'>
        <p className='text-2xl'>Page: {page < 1 ? 1 : page}</p>
        <div className='flex gap-5'>
          <button onClick={() => setPage(page + 1)} className='bg-blue-500 text-white p-2 px-4 rounded-lg cursor-pointer'>Load Next</button>
          <button onClick={() => setPage(page - 1)} disabled={page <= 1} className='bg-blue-500 text-white p-2 px-4 rounded-lg cursor-pointer disabled:opacity-50'>Load Previous</button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingShows;
