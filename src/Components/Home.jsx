import react from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import PopularMovies from './PopularMovies'
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import TopRatedMovies from './TopRatedMovies';
import TVShows from './TVShows';
import Upcoming from './Upcoming';
import Genres from './Genres';
import { GenreList } from './GenreList';
import MovieDetails from './MovieDetails';
import TVShowInfo from './TVShowInfo';

function Home() {

  return (
    <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<PopularMovies />} />
      <Route path="/top-rated" element={<TopRatedMovies />} />
      <Route path='/genre' element={<Genres />} />
      <Route path="/tv-shows" element={<TVShows />} />
      <Route path="/upcoming" element={<Upcoming />} />
      <Route path="/genres/:genreId/:genre_name" element={<GenreList />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/tv/:id" element={<TVShowInfo />} />
    </Routes>
    <Footer />
    </div>
  )
}

export default Home