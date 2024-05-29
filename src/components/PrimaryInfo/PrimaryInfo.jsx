import PropTypes from "prop-types";
import { Suspense, lazy, useState } from "react";
import { Link } from "@mui/material";
import style from "./primary-info.module.scss";
import {
  BOOKMARK_ICON,
  LIKE_ICON,
  LIST_ICON, PLAY_ICON, POSTER_URL, WATCH_PROVIDER_LOGO_BASE_URL,
} from "../../constants/constants";
import Rating from "../Rating/Rating";
import { formatMovieDetails } from "../../helpers/formatMovieDetails";
import Img from "../Img/Img";
import Spinner from "../Spinner/Spinner";

const PlayTrailer = lazy(() => import("./PlayTrailer/PlayTrailer"));

const PrimaryInfo = ({
  originalTitle,
  releaseDate,
  creator,
  contentType,
  data,
  youtubeId,
  watchProvider,
}) => {
  const [isIframeVisible, setIsIframeVisible] = useState(false);
  const {
    overview, poster_path: posterPath, origin_country: originCountry, genres, runtime: runTime, vote_average: voteAverage, tagline: tagLine,
  } = data;

  const {
    watchProviderSlug,
    formattedReleaseDate,
    formattedRuntime,
    rating,
    releaseYear,
  } = formatMovieDetails(watchProvider, releaseDate, runTime, voteAverage);

  const handlePlayTrailer = async () => {
    setIsIframeVisible((previousValue) => {
      const newValue = !previousValue;
      window.scrollTo(0, 0);
      document.body.style.overflow = newValue ? "hidden" : "initial";
      return newValue;
    });
  };

  return (
    <>
      <div className={style["movie-info"]}>
        <div className={style["poster-container"]}>
          <Img
            alt="Movie poster"
            className={`${style.poster} ${!watchProviderSlug && style['poster-border']}`}
            src={`${POSTER_URL}${posterPath}`}
          />
          {watchProvider && watchProviderSlug ? (
            <div className={style["watch-provider-container"]}>
              <Img
                alt="logo of the watch provider"
                className={style["watch-provider-logo"]}
                src={`${WATCH_PROVIDER_LOGO_BASE_URL}${watchProviderSlug}`}
              />
              <div className={style["watch-provider-link-wrapper"]}>
                <span className={style.label}>Now Streaming</span>
                <Link className={style["watch-provider-link"]} to="/">
                  Watch Now
                </Link>
              </div>
            </div>
          ) : null}
        </div>
        <div className={style.content}>
          <div className={style["name-container"]}>
            <h2 className={style.name}>{originalTitle}</h2>
            {" "}
            <span
              className={style["release-year"]}
            >
              {`(${releaseYear})`}
            </span>
          </div>
          <div className={style["info-container"]}>
            {contentType === 'movie' && (
            <>
              <span className={style["release-date"]}>
                {formattedReleaseDate}
              </span>
              {originCountry.map((country) => <span key={country}>{` (${country})`}</span>)}
              <span className={style.divider}>•</span>
            </>
            )}
            <span className={style.genre}>
              {genres.map(({ name }, index) => {
                if (index === 0) {
                  return `${name}`;
                }
                return `, ${name}`;
              })}
            </span>
            {contentType === 'movie' && (
            <>
              <span className={style.divider}>•</span>
              <span className={style.genre}>{formattedRuntime}</span>
            </>
            )}
          </div>
          <div className={style['rating-wrapper']}>
            <div className={style["rating-container"]}>
              <Rating rating={rating} size={60} />
              <span className={style["rating-title"]}>
                User
                {' '}
                <br />
                {' '}
                Score
              </span>
            </div>
          </div>
          <div className={style.actions}>
            <div className={style.action}>
              <Img
                alt="list icon"
                className={style.icon}
                src={LIST_ICON}
              />
            </div>
            <div className={style.action}>
              <Img
                alt="like icon"
                className={style.icon}
                src={LIKE_ICON}
              />
            </div>
            <div className={style.action}>
              <Img
                alt="bookmark icon"
                className={style.icon}
                src={BOOKMARK_ICON}
              />
            </div>
            {youtubeId ? (
              <div
                className={style["play-link-container"]}
                role="button"
                tabIndex={0}
                onClick={handlePlayTrailer}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handlePlayTrailer();
                  }
                }}
              >
                <Img
                  alt="play icon"
                  className={style["play-icon"]}
                  src={PLAY_ICON}
                />
                <button className={style["play-link"]} type="button">
                  Play Trailer
                </button>
              </div>
            ) : null}
          </div>
          <div className={style["overview-container"]}>
            <span className={style.tagline}>{tagLine}</span>
            <span className={style["overview-title"]}>Overview</span>
            <p className={style.overview}>{overview}</p>
          </div>
          {contentType === 'tv' && creator ? (
            <div className={style["creator-container"]}>
              <span className={style["creator-name"]}>{creator}</span>
              <span className={style["creator-label"]}>Creator</span>
            </div>
          ) : null}
        </div>
      </div>
      {isIframeVisible ? (
        <Suspense fallback={<Spinner />}>
          <PlayTrailer
            handlePlayTrailer={handlePlayTrailer}
            youtubeId={youtubeId}
          />
        </Suspense>
      ) : null}

    </>
  );
};

PrimaryInfo.propTypes = {
  originalTitle: PropTypes.string,
  releaseDate: PropTypes.string,
  creator: PropTypes.string,
  contentType: PropTypes.string.isRequired,
  data: PropTypes.shape({
    overview: PropTypes.string,
    tagline: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
    ),
    runtime: PropTypes.number,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
    origin_country: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  youtubeId: PropTypes.string,
  watchProvider: PropTypes.shape({
    IN: PropTypes.shape({
      flatrate: PropTypes.arrayOf(PropTypes.shape({
        logo_path: PropTypes.string,
      })),
      buy: PropTypes.arrayOf(PropTypes.shape({
        logo_path: PropTypes.string,
      })),
      ads: PropTypes.arrayOf(PropTypes.shape({
        logo_path: PropTypes.string,
      })),
      free: PropTypes.arrayOf(PropTypes.shape({
        logo_path: PropTypes.string,
      })),
      rent: PropTypes.arrayOf(PropTypes.shape({
        logo_path: PropTypes.string,
      })),
    }),
  }).isRequired,
};

PrimaryInfo.defaultProps = {
  creator: undefined,
  originalTitle: undefined,
  releaseDate: undefined,
  youtubeId: undefined,
};

export default PrimaryInfo;
