import React, { useEffect } from "react";
import { NETFLIX_LOGO_HOME, SUPPORTED_LANGUAGES } from "../Utils/constant";
import { signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../Utils/userSlice";
import { toggleGptSearchView } from "../Utils/gptSlice";
import { changeLanguage } from "../Utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-screen z-10 px-8 py-2 bg-gradient-to-b from-black flex justify-between">
      <img
        className=" w-52  cursor-pointer"
        src={NETFLIX_LOGO_HOME}
        alt="netflix_logo"
      />

      {user && (
        <div className=" flex ">
          {showGptSearch && (
            <select
              onChange={handleLanguageChange}
              className=" px-5  h-10  my-5 mr-10  rounded-md bg-gray-800  text-gray-300 "
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptSearch}
            className="bg-sky-600 hover:bg-sky-700 delay-150 mx-4 text-white px-4 h-10 rounded-md my-5"
          >
            {showGptSearch ? "Home page" : "GPT Search"}
          </button>
          <img
            className=" my-5 mx-9 w-10 h-10 rounded-md cursor-pointer"
            src={user?.photoURL}
            alt="user_singed_icon"
          />
          <button
            onClick={handleSignOut}
            className=" bg-[#e50914] w-24 mr-20 font-semibold h-10 text-white my-5 rounded-md delay-150 hover:bg-[#92343b]   "
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
