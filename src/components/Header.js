import React, { useEffect } from "react";
import { NETFLIX_LOGO_HOME } from "../Utils/constant";
import { signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../Utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

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
  return (
    <div className="absolute w-screen z-10 px-8 py-2 bg-gradient-to-b from-black flex justify-between">
      <img
        className=" w-52  cursor-pointer"
        src={NETFLIX_LOGO_HOME}
        alt="netflix_logo"
      />

      {user && (
        <div className=" flex">
          <img
            className=" my-5 mx-3 w-10 h-10 rounded-md cursor-pointer"
            src={user?.photoURL}
            alt="user_singed_icon"
          />
          <button
            onClick={handleSignOut}
            className=" bg-[#e50914] w-24 font-semibold h-10 text-white my-5 rounded-md hover:bg-[#92343b]   "
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
