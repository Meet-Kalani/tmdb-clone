import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError } from "../../utils/helpers";
import style from "./details-page.module.scss";
import PrimaryInfo from "../../components/PrimaryInfo/PrimaryInfo";
import CastInfo from "../../components/CastInfo/CastInfo";
import StatsPanel from "../../components/StatsPanel/StatsPanel";
import UserReview from "../../components/UserReview/UserReview";
import CurrentSeason from "../../components/CurrentSeason/CurrentSeason";
import Recommendation from "../../components/Recommendation/Recommendation";
import { fetchMovieData, fetchTVData } from "../../service/api";
import { BACKDROP_BASE_URL } from "../../constants/constants";
import SkeletonLoader from "../../components/CurrentSeason/SkeletonLoader/SkeletonLoader";
import useTitle from "../../hooks/useTitle";

// IMPLEMENT CUSTOM HOOK
// date time library use it bitch
// pass entrier props rather than invidually

const DetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [details, setDetails] = useState({});
  const contentType = location.pathname.includes('tv') ? 'tv' : 'movie';
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const res = contentType === 'tv' ? await fetchTVData(movieId) : await fetchMovieData(movieId);
        setDetails(res);
      }
      catch (err) {
        notifyError(err, style.toast);
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, [movieId, navigate, contentType]);

  const backdropStyle = {
    background: `linear-gradient(to right, rgb(32, 32, 32) calc(-510px + 50vw), rgba(32, 32, 32, 0.84) 50%, rgba(32, 32, 32, 0.84) 100%), url(${BACKDROP_BASE_URL}${details.backdrop_path})`,
  };

  const documentTitle = `${details.name || details.original_title} (${details?.first_air_date?.slice(0, 4) || details?.release_date?.slice(0, 4)}) — The Movie Database (TMDB)`;
  useTitle(documentTitle);

  const creatorName = details?.created_by?.[0]?.name ?? undefined;
  const parsedMovieId = parseInt(movieId, 10);

  return (
    <>
      <ToastContainer />
      <div className={style["movie-page"]}>
        <div className={style["primary-info"]} style={backdropStyle}>
          <div className={style["movie-info-wrapper"]}>
            {contentType === 'tv' ? (
              <PrimaryInfo
                contentType={contentType}
                creator={creatorName}
                genres={details.genres}
                id={movieId}
                isLoading={isLoading}
                notifyError={notifyError}
                originalTitle={details.name}
                originCountry={details.origin_country}
                overview={details.overview}
                posterPath={details.poster_path}
                releaseDate={details.first_air_date}
                runTime={details.runtime}
                tagLine={details.tagline}
                voteAverage={details.vote_average}
              />
            ) : (
              <PrimaryInfo
                contentType={contentType}
                genres={details.genres}
                id={movieId}
                isLoading={isLoading}
                notifyError={notifyError}
                originalTitle={details.original_title}
                originCountry={details.origin_country}
                overview={details.overview}
                posterPath={details.poster_path}
                releaseDate={details.release_date}
                runTime={details.runtime}
                tagLine={details.tagline}
                voteAverage={details.vote_average}
              />
            )}
          </div>
        </div>
        <div className={style["secondary-info"]}>
          <div className={style.wrapper}>
            <CastInfo contentType={contentType} id={parsedMovieId} notifyError={notifyError} />
            {(contentType === 'tv') ? (
              isLoading ? <SkeletonLoader />
                : (
                  <CurrentSeason
                    airDate={details.seasons.at(-1).air_date}
                    episodeCount={details.seasons.at(-1).episode_count}
                    isLoading={isLoading}
                    name={details.seasons.at(-1).name}
                    overview={details.seasons.at(-1).overview}
                    posterPath={details.seasons.at(-1).poster_path}
                    rating={Math.floor(details.seasons.at(-1).vote_average * 10)}
                  />
                )
            ) : undefined}
            <UserReview contentType={contentType} id={parsedMovieId} notifyError={notifyError} />
            <Recommendation contentType={contentType} id={parsedMovieId} notifyError={notifyError} />
          </div>
          <div>
            <StatsPanel
              budget={details.budget}
              contentType={contentType}
              homepage={details.homepage}
              id={parsedMovieId}
              isLoading={isLoading}
              networks={details.networks}
              notifyError={notifyError}
              revenue={details.revenue}
              spokenLanguages={details.spoken_languages}
              status={details.status}
              type={details.type}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
