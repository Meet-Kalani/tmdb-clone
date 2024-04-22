import style from "./movie-page.module.scss";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import CastInfo from "../../components/CastInfo/CastInfo";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieData } from "../../helpers/DataPullers";
import { useNavigate } from "react-router-dom";
import { BACKDROP_BASE_URL } from "../../constants/constants";

// fix backdrop image scaling

const MoviePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetchMovieData(movieId).then((res) => setMovie(res));
    } catch (err) {
      console.error(err);
      navigate("/not-found");
    }
  }, [movieId, navigate]);

  const backdropStyle = {
    background: `linear-gradient(to right, rgb(32, 32, 32) calc(-510px + 50vw), rgba(32, 32, 32, 0.84) 50%, rgba(32, 32, 32, 0.84) 100%), url(${BACKDROP_BASE_URL}${movie.backdrop_path})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left calc((50vw - 170px) - 340px) top",
  };

  return (
    <div className={style["movie-page"]}>
      <div className={style["primary-info"]} style={backdropStyle}>
        <div className={style["wrapper"]}>
          {Object.keys(movie).length > 0 && (
            <MovieInfo {...movie} id={movieId} />
          )}
        </div>
      </div>
      <div className={style["secondary-info"]}>
        <div className={style['wrapper']}>
          <CastInfo id={movieId} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MoviePage;
