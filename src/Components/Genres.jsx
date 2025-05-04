import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Genres =() => {
const [genre, setGenre] = useState([]);

useEffect(() => {
  const fetchGenre=async()=>{
    try{
      const response=await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=2d146261b6eec38b5fdeeb844bfc1cbd&language=en-US')
      const data = response.data;
      setGenre(data.genres);
    }
    catch (error) {
      console.error('Error fetching movies:', error);
    }
  }
  fetchGenre();
},[]);
  return (
    <div className='bg-[#06202B] p-5 h-screen w-screen'>
      <h1 className='text-5xl justify-center items-center flex py-6'>Genre List</h1>
      <div className="grid grid-cols-3 gap-5">
        {genre.map((type)=>(
          <div key={type.id} className='bg-gray-800 p-4 rounded-lg'>
            <button className='text-white text-xl cursor-pointer' >
            {type.name}</button>
          </div>
        ))}
    </div>
    </div>
  );
}

export default Genres;