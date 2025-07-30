import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useMovieDetails } from './MovieDetailsContext';
import { useNavigate } from 'react-router-dom';

export const GenreList =() => {
  const [movies, setMovies] = useState([]);
  const [page,setPage]=useState(1);
  const { genreId,genre_name } = useParams(); 
  const { setSelectedMovie, fetchMovieDetails } = useMovieDetails();
  const navigate = useNavigate();

  useEffect(()=>{
  const fetchMovieByGenres=async()=>{
    try{
      const response=await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2d146261b6eec38b5fdeeb844bfc1cbd&with_genres=${genreId}&page=${page}`);
      const data=response.data;
      setMovies(data.results);
    }
    catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  fetchMovieByGenres();
},[genreId,page])

  const handleClick=(movie)=>{
    setSelectedMovie(movie);
    fetchMovieDetails(movie.id);
    navigate(`/movie/${movie.id}`);
  }

  const formatDat = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

  return (
    <div>
      <div className='bg-[#06202B] p-5'>
      <h1 className='text-5xl justify-center items-center flex py-6'>{genre_name} Movies</h1>
      <div className="grid grid-cols-5 gap-5">
        {movies.map((movie)=>(
          <div key={movie.id} className='bg-gray-800 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform' onClick={() => handleClick(movie)}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='rounded-lg' />
            <h2 className='text-white text-xl'>{movie.title}</h2>
            <p className='text-gray-400'>{formatDat(movie.release_date)}</p>
            <p className='text-gray-400'>{movie.overview}</p>
            <p className='text-yellow-500'>Rating: {movie.vote_average}</p>
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
    </div>
  );
}