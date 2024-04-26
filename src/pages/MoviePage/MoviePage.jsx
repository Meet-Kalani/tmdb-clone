import style from "./movie-page.module.scss";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import CastInfo from "../../components/CastInfo/CastInfo";
import StatsPanel from "../../components/StatsPanel/StatsPanel";
import UserReview from "../../components/UserReview/UserReview";
import CurrentSeason from "../../components/CurrentSeason/CurrentSeason";
import Recommendation from "../../components/Recommendation/Recommendation";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchMovieData, fetchTVData } from "../../helpers/DataPullers";
import { BACKDROP_BASE_URL } from "../../constants/constants";

// was doing user review and cast info for web series and also refactor code it is way messy

const MoviePage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState({});
  const [isTVSeries, setIsTVSeries] = useState();
  const [contentType, setContentType] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    if (location.pathname.includes("tv")) {
      setContentType("tv")
      setIsTVSeries(true)
    } else {
      setContentType("movie")
    }
  },[location.pathname])

  useEffect(() => {
    try {
      if (isTVSeries) {
        fetchTVData(movieId).then((res) => setMovie(res));
      } else {
        fetchMovieData(movieId).then((res) => setMovie(res));
      }
    } catch (err) {
      console.error(err);
      navigate("/not-found");
    }
  }, [movieId, navigate, isTVSeries]);

  const backdropStyle = {
    background: `linear-gradient(to right, rgb(32, 32, 32) calc(-510px + 50vw), rgba(32, 32, 32, 0.84) 50%, rgba(32, 32, 32, 0.84) 100%), url(${BACKDROP_BASE_URL}${movie.backdrop_path})`,
  };
  const creatorName =
    movie && movie.created_by && movie.created_by.length
      ? movie.created_by[0].name
      : undefined;

  return (
    <div className={style["movie-page"]}>
      <div className={style["primary-info"]} style={backdropStyle}>
        <div className={style["movie-info-wrapper"]}>
          {Object.keys(movie).length > 0 &&
            (isTVSeries ? (
              <MovieInfo
                original_title={movie.name}
                release_date={movie.first_air_date}
                {...movie}
                creator={creatorName}
                contentType={contentType}
                id={movieId}
              />
            ) : (
              <MovieInfo {...movie} id={movieId} />
            ))}
        </div>
      </div>
      <div className={style["secondary-info"]}>
        <div className={style["wrapper"]}>
          <CastInfo id={parseInt(movieId)} contentType={contentType} />
          {Object.keys(movie).length > 0 && contentType === 'tv' && (
            <CurrentSeason
              {...movie.seasons.at(-1)}
              rating={Math.floor(movie.vote_average * 10)}
            />
          )}
          <UserReview id={parseInt(movieId)} contentType={contentType} />
          <Recommendation id={parseInt(movieId)} contentType={contentType} />
        </div>
        <div>
          {Object.keys(movie).length > 0 && (
            <StatsPanel
              {...movie}
              contentType={contentType}
              id={parseInt(movieId)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
