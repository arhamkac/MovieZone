import { useMovieDetails } from "./MovieDetailsContext";

const MovieDetails = () => {
  const { selectedMovie, cast, trailerKey } = useMovieDetails();

  // Debugging: Check selectedMovie, cast, and trailerKey
  console.log('Selected Movie:', selectedMovie);
  console.log('Cast:', cast);
  console.log('Trailer Key:', trailerKey);

  if (!selectedMovie) return <div>Loading movie details...</div>;

  return (
    <div className="bg-[#06202B] p-5">
      <h1 className="text-5xl justify-center items-center flex py-6">Movie Details</h1>
      <div className="bg-gray-800 p-4 rounded-lg gap-0">
      <h2 className="text-3xl justify-start items-start py-6">{selectedMovie.title}</h2>
      <p className="text-2xl justify-start items-start py-6">{selectedMovie.overview}</p>
      <div className="bg-gray-800 p-4 rounded-lg flex flex-row gap-80 items-center">
      {selectedMovie.poster_path ? (
        
        <img
          src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
          alt={selectedMovie.title}
          className="justify-center items-center flex py-6 rounded-lg w-1/5"
        />
      ) : (
        <p>No image available.</p>
      )}
      <div className="flex flex-col justify-start items-start">
      <h3 className="text-2xl py-6 justify-start items-center">Trailer:</h3>
      {trailerKey ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No trailer available.</p>
      )}
      </div>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg flex flex-row gap-80 items-center">
      <h3>Cast:</h3>
      {cast && cast.length > 0 ? (
        <ul className="grid grid-cols-3 gap-4">
          {cast.map((actor) => (
            <li key={actor.cast_id}>
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
  );
};

export default MovieDetails;