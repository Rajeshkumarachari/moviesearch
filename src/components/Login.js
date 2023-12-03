import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(false);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className=" absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c906271d-7184-4eec-83c9-b6d4c1a068ec/728874a6-eeda-400a-9bcf-a935a1408a4f/IN-en-20231127-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background-banner"
        />
      </div>
      <form className=" w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0  text-white bg-opacity-80 rounded-md">
        <h1 className=" font-bold text-3xl py-4  px-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Enter your Name"
            className=" p-4 my-4 w-full rounded-md bg-[#333] text-lg "
          />
        )}

        <input
          type="text"
          placeholder="Email or phone number"
          className=" p-4 my-4 w-full rounded-md bg-[#333] text-lg "
        />
        <input
          type="password"
          placeholder="Password"
          className=" p-4 my-4 w-full rounded-md  bg-[#333] text-lg "
        />
        <button className=" p-4 my-4 bg-[#e50914] w-full rounded-md text-lg font-semibold ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <div className=" flex justify-between">
          <div className=" flex">
            <input
              type="checkbox"
              className=" w-5 h-5  accent-slate-200 bg-gray-300"
            />
            <p className="ml-2 text-[#b3b3b3] text-base">Remember me</p>
          </div>
          <div>
            <p className="text-base text-[#b3b3b3] hover:underline cursor-pointer">
              Need help?
            </p>
          </div>
        </div>
        <p className="text-[#737373] my-3 text-lg">
          {isSignInForm ? "New to Netflix?" : "Already registered!"}{" "}
          <span
            className=" text-white cursor-pointer hover:underline"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? " Sign Up now." : "Sign In now."}
          </span>
        </p>
        <h1 className="text-[#737373]">
          Sign in is protected by Google reCAPTCHA to ensure you’re not a bot.{" "}
          <span className=" text-[#0071eb] hover:underline cursor-pointer ">
            Learn more.
          </span>
        </h1>
      </form>
    </div>
  );
};

export default Login;
