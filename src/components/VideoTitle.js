import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" w-screen aspect-video  px-8 md:px-20 absolute pt-[20%] text-white bg-gradient-to-r from-black">
      <h1 className=" text-2xl md:text-5xl font-normal md:font-bold">
        {title}{" "}
      </h1>
      <p className=" hidden md:block py-6 text-lg w-2/5">{overview} </p>
      <div className="flex">
        <button className="  bg-slate-100 px-4 md:px-12 hover:bg-slate-200 border  py-1 md:py-3 rounded-md  my-3 md:my-0 text-lg font-semibold text-black">
          Play
        </button>
        <button className="hidden md:block bg-gray-800 hover:bg-gray-700 opacity-60  mx-3 px-7 rounded-md  text-white font-bold py-3">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
