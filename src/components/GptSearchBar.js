import React from "react";
import lang from "../Utils/languageConstant";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const lanKey = useSelector((store) => store.config.lang);
  return (
    <div className="flex pt-[15%] justify-center">
      <form className=" w-1/2  grid bg-black grid-cols-12 rounded-lg ">
        <input
          className=" p-4 m-4 col-span-9 text-xl  rounded-md   "
          type="text"
          placeholder={lang[lanKey].gptSearchPlaceholder}
        />
        <button className=" text-white px-4 py-2 m-4 col-span-3 rounded-md text-lg bg-lime-600">
          {lang[lanKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
