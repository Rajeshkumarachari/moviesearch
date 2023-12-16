import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { NETFLIX_BACKGROUND_IMG } from "../Utils/constant";

const GptSearch = () => {
  return (
    <div>
      <div className="  fixed -z-10">
        <img
          className=" h-full"
          src={NETFLIX_BACKGROUND_IMG}
          alt="background-banner"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
