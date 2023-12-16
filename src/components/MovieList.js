import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 ">
      <h1 className=" text-xl md:text-3xl font-medium text-gray-400 py-3 ">
        {title}{" "}
      </h1>
      <div className=" flex overflow-x-auto no-scroll  ">
        <div className=" flex ">
          {movies &&
            movies.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
