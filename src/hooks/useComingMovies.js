import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/constant";
import { useEffect } from "react";
import { addComingMovies } from "../Utils/moviesSlice";

const useComingMovies = () => {
  const dispatch = useDispatch();

  const nowComingMovies = useSelector((store) => store.movies.ComingMovies);

  const getComingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );
    const json = await data.json();

    dispatch(addComingMovies(json.results));
  };

  useEffect(() => {
    !nowComingMovies && getComingMovies();
  }, []);
};

export default useComingMovies;
