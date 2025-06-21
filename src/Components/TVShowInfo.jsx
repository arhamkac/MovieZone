import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';

const API_KEY = "2d146261b6eec38b5fdeeb844bfc1cbd";

const TVShowInfo=()=>{
  const {id}=useParams();
  const [tvShow, setTvShow] = useState(null);
  const [error,setError]=useState('');
  const BASE_URL = 'https://api.themoviedb.org/3/tv';
  useEffect(()=>{
    const fetchDetails=async()=>{
      try {
        const [details,credits,videos]=await Promise.all([
          axios.get(`${BASE_URL}/${id}?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/${id}/credits?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/${id}/videos?api_key=${API_KEY}`)
        ]);

        const videosList = videos.data.results.filter(
        (v) => v.site === "YouTube"
        );

        const selectedVideos = videosList.slice(0,2);

        setTvShow({
          title:details.data.name,
          description:details.data.overview,
          poster:`https://image.tmdb.org/t/p/w500/${details.data.poster_path}`,
          videos:selectedVideos.map((v) => `https://www.youtube.com/watch?v=${v.key}`),
          cast:credits.data.cast.slice(0,5)
      })

      } 
      catch (err) {
        console.error(err)
        setError("Failed to load show details")
      }
    }
    fetchDetails();
  },[id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!tvShow) return <p className="text-white text-center mt-10">Loading...</p>;

  return(
    <div className="bg-[#06202B] p-5">
      <h1 className="text-5xl justify-center items-center flex py-6">Show Details</h1>
      <div className="bg-gray-800 p-4 rounded-lg gap-0">
      <h2 className="text-3xl justify-start items-start py-6">{tvShow.title}</h2>
      <p className="text-2xl justify-start items-start py-6">{tvShow.description}</p>
      <div className="bg-gray-800 p-4 rounded-lg flex flex-row gap-80 items-center">
      {tvShow.poster ? (
        <img
          src={tvShow.poster}
          alt={tvShow.title}
          className="justify-center items-center flex py-6 rounded-lg w-1/5"
        />
      ) : (
        <p>No image available.</p>
      )}
      <div className="flex flex-col justify-start items-start">
      <h3 className="text-2xl py-6 justify-start items-center">Videos:</h3>
      {tvShow.videos && tvShow.videos.length > 0 ? (
      <div className="flex flex-col gap-10 mb-6">
      {tvShow.videos.map((videoUrl, index) => (
      <div key={index} className="w-full md:w-[500px] aspect-video">
        <ReactPlayer
          url={videoUrl}
          controls
          width="100%"
          height="100%"
        />
      </div>
    ))}
    </div>
    ) : (
      <p>No videos available.</p>
    )}
      </div>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg flex flex-row gap-80 items-center">
      <h3>Top Cast:</h3>
      {tvShow.cast && tvShow.cast.length > 0 ? (
        <ul className="grid grid-cols-3 gap-4">
          {tvShow.cast.map((actor) => (
            <li key={actor.id}>
              {actor.name} as {actor.character}
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
    </div>
    </div>
  )
}

export default TVShowInfo;