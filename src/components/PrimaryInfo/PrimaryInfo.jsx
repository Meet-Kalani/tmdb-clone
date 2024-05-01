import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@mui/material";
import style from "./primary-info.module.scss";
import {
  POSTER_URL,
  WATCH_PROVIDER_LOGO_BASE_URL,
} from "../../constants/constants";
import {
  fetchWatchProviders,
  fetchYoutubeVideo,
} from "../../service/api";
import Rating from "../Rating/Rating";
import SkeletonLoader from "./SkeletonLoader/SkeletonLoader";

const PrimaryInfo = ({
  notifyError,
  id,
  originalTitle,
  releaseDate,
  isLoading,
  creator,
  contentType,
  data,
}) => {
  const [watchProvider, setWatchProvider] = useState({});
  const [isIframeVisible, setIsIframeVisible] = useState(false);
  const [youtubeId, setYoutubeId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchWatchProviders(id, contentType);
        setWatchProvider(res);
      }
      catch (err) {
        notifyError(err, style.toast);
      }
    })();
  }, [id, contentType, notifyError]);

  if (isLoading || !data) {
    return <SkeletonLoader />;
  }

  const {
    overview, poster_path: posterPath, origin_country: originCountry, genres, runtime: runTime, vote_average: voteAverage, tagline: tagLine,
  } = data;

  function getLogoPath(provider) {
    return provider?.[0]?.logo_path;
  }

  const logoPath = watchProvider?.IN?.flatrate
                         || watchProvider?.IN?.buy
                         || watchProvider?.IN?.ads
                         || watchProvider?.IN?.free
                         || undefined;

  const watchProviderSlug = logoPath && getLogoPath(logoPath);
  const [year, month, day] = releaseDate.split("-");
  const formattedReleaseDate = `${month}/${day}/${year}`;
  const formattedRuntime = `${Math.floor(runTime / 60)}h ${runTime % 60}m`;
  const rating = Math.floor(voteAverage * 10);
  const releaseYear = releaseDate.slice(0, 4);

  const handlePlayTrailer = async () => {
    setIsIframeVisible((previousValue) => !previousValue);
    window.scrollTo(0, 0);
    document.body.style.overflow = isIframeVisible ? "initial" : "hidden";

    if (!isIframeVisible) {
      try {
        const res = await fetchYoutubeVideo(id);
        setYoutubeId(res);
      }
      catch (err) {
        notifyError(err, style.toast);
      }
    }
  };

  return (
    <>
      <div className={style["movie-info"]}>
        <div className={style["poster-container"]}>
          <img
            alt="Movie poster"
            className={`${style.poster} ${!watchProviderSlug && style['poster-border']}`}
            src={`${POSTER_URL}${posterPath}`}
            onError={(event) => {
              event.target.src = "https://placehold.jp/16/ccc/ffffff/138x175.png?text=Not+Found!";
            }}
          />
          {watchProvider && watchProviderSlug ? (
            <div className={style["watch-provider-container"]}>
              <img
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
              {originCountry.map((country) => <span key={crypto.randomUUID()}>{` (${country})`}</span>)}
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
              <Rating rating={rating} size={68} />
              <span className={style["rating-title"]}>
                User
                {' '}
                <br />
                {' '}
                Score
              </span>
            </div>
          </div>
          <div className={style.wrapper}>
            <div className={style.action}>
              <span className={`${style['list-icon']} ${style.icon}`} />
            </div>
            <div className={style.action}>
              <span className={`${style['like-icon']} ${style.icon}`} />
            </div>
            <div className={style.action}>
              <span className={`${style['bookmark-icon']} ${style.icon}`} />
            </div>
            {contentType === 'movie' && (
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
              <span className={style["play-icon"]} />
              <button className={style["play-link"]} type="button">
                Play Trailer
              </button>
            </div>
            )}
          </div>
          <div className={style["overview-container"]}>
            {contentType === 'movie' && <span className={style.tagline}>{tagLine}</span>}
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
      )
      {isIframeVisible ? (
        <PlayTrailer
          handlePlayTrailer={handlePlayTrailer}
          youtubeId={youtubeId}
        />
      ) : null}
    </>
  );
};

const PlayTrailer = ({ handlePlayTrailer, youtubeId }) => createPortal(
  <div className={style.backdrop}>
    <div className={style["play-trailer"]}>
      <div className={style.header}>
        <span className={style.title}>Play Trailer</span>
        <span
          className={style["close-btn"]}
          role="button"
          tabIndex={0}
          onClick={handlePlayTrailer}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handlePlayTrailer();
            }
          }}
        >
          x
        </span>
      </div>
      <div className={style.content}>
        <iframe
          className={style["yt-iframe"]}
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&hl=en&modestbranding=1&fs=1&autohide=1`}
          title="Movie Trailer"
          allowFullScreen
        />
      </div>
    </div>
  </div>,
  document.getElementById("portal"),
);

PrimaryInfo.propTypes = {
  id: PropTypes.string.isRequired,
  notifyError: PropTypes.func.isRequired,
  originalTitle: PropTypes.string,
  releaseDate: PropTypes.string,
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
  }),
  creator: PropTypes.string,
  contentType: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

PrimaryInfo.defaultProps = {
  creator: undefined,
  originalTitle: undefined,
  releaseDate: undefined,
  data: {
    poster_path: "https://placehold.jp/16/ccc/ffffff/300x450.png?text=Not+Found!",
    run_time: undefined,
    overview: undefined,
    origin_country: undefined,
    genres: undefined,
    vote_average: undefined,
    tagline: undefined,
  },
};

export default PrimaryInfo;
