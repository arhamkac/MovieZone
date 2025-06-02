import axios from 'axios';
import {react,useState,useEffect,useContext,createContext} from 'react'

const MovieDetailsContext = createContext();

export const MovieDetailsProvider = ({children}) => {
    const [selectedMovie,setSelectedMovie]=useState(null);
    const [cast,setCast]=useState([]);
    const [trailerKey,setTrailerKey]=useState(null);

    const fetchMovieDetails=async (movieId)=>{
        try{
            const CastDetails=await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=2d146261b6eec38b5fdeeb844bfc1cbd`);
            const topTenCast = CastDetails.data.cast.slice(0, 10); // 👈 only take top 10
            setCast(topTenCast);
            const TrailerDetails=await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2d146261b6eec38b5fdeeb844bfc1cbd`);
            const trailer=TrailerDetails.data.results.find((video) => video.type === 'Trailer');
            if(trailer) setTrailerKey(trailer.key);
            else {setTrailerKey(null);}
        }
        catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };
    return(
        <MovieDetailsContext.Provider value={{selectedMovie,setSelectedMovie,cast,trailerKey,fetchMovieDetails}}>
            {children}
        </MovieDetailsContext.Provider>
    )   
}

export const useMovieDetails = () => {
    return useContext(MovieDetailsContext);
}