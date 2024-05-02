import React, { useRef } from "react";
import lang from "../Utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import openai from "../Utils/openai";
import { API_OPTIONS } from "../Utils/constant";
import { addGptMovieResult } from "../Utils/gptSlice";

const GptSearchBar = () => {
  const lanKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };
  const handleGptSearchClick = async () => {
    const getQuery =
      " Act as a movie recommendation system and suggest some movies for the query mostly south indian movies  " +
      searchText.current.value +
      " only give me names of 20 top movies , coma separated like the example result given ahead. Example Gadar, Leo, Mankatha  ";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: getQuery }],
      model: "gpt-3.5-turbo",
    });
    if (!gptResults.choices) {
    }

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    //console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className=" pt-[40%] flex md:pt-[15%] justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-full md:w-1/2  grid bg-black grid-cols-12 rounded-lg "
      >
        <input
          ref={searchText}
          className=" p-3 md:p-4 m-2 col-span-9 text-sm md:text-xl  rounded-md   "
          type="text"
          placeholder={lang[lanKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className=" text-white px-2 md:px-4 py-2 m-4 col-span-3 rounded-md text-md md:text-sm bg-lime-600"
        >
          {lang[lanKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
