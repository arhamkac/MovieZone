import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMovieDetails } from './MovieDetailsContext';
import { useNavigate } from 'react-router-dom';

const TopRatedMovies =() => {
const [movies, setMovies] = useState([]);
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = "2d146261b6eec38b5fdeeb844bfc1cbd";
const ENDPOINT = '/movie/top_rated';
const [page,setPage]=useState(1);
const {setSelectedMovie, fetchMovieDetails} = useMovieDetails();
const navigate = useNavigate();

useEffect(() => {
  const fetchMovies=async()=>{
    try{
      const response=await axios.get(`${BASE_URL}${ENDPOINT}`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          page: page,
        }
      });
      const data = response.data;
        setMovies(data.results);
    }
    catch (error) {
      console.error('Error fetching movies:', error);
    }
  }
  fetchMovies();
},[page]);

const handleClick=(movie)=>{
    setSelectedMovie(movie);
    fetchMovieDetails(movie.id);
    navigate(`/movie/${movie.id}`);
  }
  return (
    <div className='bg-[#06202B] p-5'>
      <h1 className='text-5xl justify-center items-center flex py-6'>Top Rated Movies</h1>
      <div className="grid grid-cols-5 gap-5">
        {movies.map((movie)=>(
          <div key={movie.id} className='bg-gray-800 p-4 rounded-lg cursor-pointer' onClick={() => handleClick(movie)}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='rounded-lg' />
            <h2 className='text-white text-xl'>{movie.title}</h2>
            <p className='text-gray-400'>{movie.release_date}</p>
            <p className='text-gray-400'>{movie.overview}</p>
            <p className='text-yellow-500'>Rating: {movie.vote_average}</p>
          </div>
        ))}
        <div className='text-2xl grid grid-cols-3 gap-30 items-center w-full justify-center whitespace-nowrap'>
        <p>Page:{page<1 ? 1 :page}</p>
        <button onClick={() => setPage(page + 1)} className='bg-blue-500 text-white p-2 rounded-lg cursor-pointer w-fit'>Load Next</button>
        <button onClick={() => setPage(page - 1)} className='bg-blue-500 text-white p-2 rounded-lg cursor-pointer w-fit'>Load Previous</button>
        </div>
    </div>
    </div>
  );
}

export default TopRatedMovies;
