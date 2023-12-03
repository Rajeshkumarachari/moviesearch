import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/validate";
import { auth } from "../Utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { NETFLIX_BACKGROUND_IMG, USER_ACCOUNT_ICON } from "../Utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const name = useRef("rajesh");

  const handleButtonClick = () => {
    const message = checkValidData(
      email.current.value,
      password.current.value,
      name.current.value
    );
    //console.log(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      //sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_ACCOUNT_ICON,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });

          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // sign in
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className=" absolute">
        <img
          className=" h-full"
          src={NETFLIX_BACKGROUND_IMG}
          alt="background-banner"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0  text-white bg-opacity-80 rounded-md"
      >
        <h1 className=" font-bold text-3xl py-4  px-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Enter your Name"
            className=" p-4 my-4 w-full rounded-md bg-[#333] text-lg "
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email or phone number"
          className=" p-4 my-4 w-full rounded-md bg-[#333] text-lg "
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className=" p-4 my-4 w-full rounded-md  bg-[#333] text-lg "
        />
        <p className=" text-[#e87c03] px-2  ">{errorMessage} </p>
        <button
          className=" p-4 my-4 bg-[#e50914] w-full rounded-md text-lg font-semibold "
          onClick={handleButtonClick}
        >
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
