import style from "./movie-page.module.scss";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieData } from "../../helpers/DataPullers";

const MoviePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetchMovieData(movieId).then((res) => setMovie(res));
  }, [movieId]);

  return (
    <div className={style["movie-page"]}>
      {Object.keys(movie).length > 0 && <MovieInfo {...movie} id={movieId} />}
    </div>
  );
};

export default MoviePage;
