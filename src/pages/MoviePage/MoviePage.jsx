import style from "./movie-page.module.scss";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/constants";
import { VITE_API_READ_ACCESS_TOKEN } from "../../constants/envConstants";

const MoviePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios(`${BASE_URL}/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${VITE_API_READ_ACCESS_TOKEN}`,
      },
    })
      .then((res) => {
        setMovie(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, [movieId]);

  return (
    <div className={style["movie-page"]}>
      {Object.keys(movie).length > 0 && <MovieInfo {...movie} id={movieId} />}
    </div>
  );
};

export default MoviePage;
