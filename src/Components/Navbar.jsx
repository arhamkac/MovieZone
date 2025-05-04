import react from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

  return (
    <div>
    <nav className='text-xl'>
    <ul className='flex justify-between bg-[#ca311d] p-4 top-0'>
    <li className='p-2 rounded cursor-pointer gap-0 flex flex-row'><p className='text-[#06202B] text-2xl'><Link to="/">MovieZone</Link></p></li>
    <li className='hover:underline p-2 rounded cursor-pointer'><Link to="/genre">Genres</Link></li>
    <li className='hover:underline p-2 rounded cursor-pointer'><Link to="/top-rated">Top Rated Movies</Link></li>
    <li className='hover:underline p-2 rounded cursor-pointer'><Link to="/tv-shows">TV Shows</Link></li>
    <li className='hover:underline p-2 rounded cursor-pointer'><Link to="/upcoming">Upcoming Movies/Shows</Link></li>
    </ul>
    </nav>
    </div>
  )
}

export default Navbar