import react from 'react'
import { Route, Routes } from 'react-router-dom';
import UpcomingMovies from './UpcomingMovies';
import UpcomingShows from './UpcomingShows';

function Upcoming() {

  return (
    <div>
    <UpcomingMovies/>
    <UpcomingShows/>
    </div>
  )
}

export default Upcoming;