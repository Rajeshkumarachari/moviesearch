import React from "react";
import { IMG_CDN_URL } from "../Utils/constant";

const MovieCard = ({ posterPath }) => {
  return (
    <div className=" w-[200px]  pr-4">
      <img
        className=" rounded cursor-pointer"
        src={IMG_CDN_URL + posterPath}
        alt="movieslogo"
      />
    </div>
  );
};

export default MovieCard;
