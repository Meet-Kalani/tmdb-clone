import PropTypes from "prop-types";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import style from "./primary-info.module.scss";
import {
  BOOKMARK_ICON,
  LIKE_ICON,
  LIST_ICON, PLAY_ICON, POSTER_URL, WATCH_PROVIDER_LOGO_BASE_URL,
} from "../../constants/constants";
import {
  fetchYoutubeVideo,
} from "../../service/api";
import Rating from "../Rating/Rating";
import { notifyError } from "../../utils/helpers";
import Img from "../Img/Img";

const PrimaryInfo = ({
  id,
  originalTitle,
  releaseDate,
  creator,
  contentType,
  data,
}) => {
  const [isIframeVisible, setIsIframeVisible] = useState(false);
  const [youtubeId, setYoutubeId] = useState(null);

  const { watchProvider } = useLoaderData();

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
    setIsIframeVisible((previousValue) => {
      const newValue = !previousValue;
      window.scrollTo(0, 0);
      document.body.style.overflow = newValue ? "hidden" : "initial";
      return newValue;
    });

    if (!isIframeVisible) {
      try {
        const res = await fetchYoutubeVideo(id);
        setYoutubeId(res);
      }
      catch (err) {
        notifyError(err);
      }
    }
  };

  return (
    <>
      <div className={style["movie-info"]}>
        <div className={style["poster-container"]}>
          <Img
            alt="Movie poster"
            className={`${style.poster} ${!watchProviderSlug && style['poster-border']}`}
            fallbackImageURL="https://placehold.jp/16/dbdbdb/ffffff/138x175.png?text=Not+Found!"
            src={`${POSTER_URL}${posterPath}`}
          />
          {watchProvider && watchProviderSlug ? (
            <div className={style["watch-provider-container"]}>
              <Img
                alt="logo of the watch provider"
                className={style["watch-provider-logo"]}
                fallbackImageURL="https://placehold.jp/16/dbdbdb/ffffff/36x36.png?text=!"
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
              <Img alt="list icon" className={style.icon} fallbackImageURL="https://placehold.jp/16/dbdbdb/ffffff/16x16.png?text=!" src={LIST_ICON} />
            </div>
            <div className={style.action}>
              <Img alt="like icon" className={style.icon} fallbackImageURL="https://placehold.jp/16/dbdbdb/ffffff/16x16.png?text=!" src={LIKE_ICON} />
            </div>
            <div className={style.action}>
              <Img alt="bookmark icon" className={style.icon} fallbackImageURL="https://placehold.jp/16/dbdbdb/ffffff/16x16.png?text=!" src={BOOKMARK_ICON} />
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
              <Img alt="play icon" className={style["play-icon"]} fallbackImageURL="https://placehold.jp/16/dbdbdb/ffffff/22x22.png?text=!" src={PLAY_ICON} />
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
