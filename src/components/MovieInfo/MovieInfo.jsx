import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import style from "./movie-info.module.scss";
import {
  IMAGE_BASE_URL,
  WATCH_PROVIDER_LOGO_BASE_URL,
} from "../../constants/constants";
import {
  fetchWatchProviders,
  fetchYoutubeVideo,
} from "../../service/api";
import Rating from "../Rating/Rating";

const MovieInfo = ({
  notifyError,
  id,
  originalTitle,
  overview,
  posterPath,
  originCountry,
  releaseDate,
  genres,
  runTime,
  voteAverage,
  creator,
  contentType,
  tagLine,
}) => {
  const [watchProvider, setWatchProvider] = useState({});
  const [isIframeVisible, setIsIframeVisible] = useState(false);
  const [youtubeId, setYoutubeId] = useState(null);

  useEffect(() => {
    try {
      fetchWatchProviders(id, contentType).then((res) => {
        if (res) {
          setWatchProvider(res);
        }
      });
    }
    catch (err) {
      notifyError(err, style.toast);
    }
  }, [id, contentType, notifyError]);

  function getLogoPath(provider) {
    if (provider && provider.length > 0 && provider[0].logo_path) {
      return provider[0].logo_path;
    }
    return "/seGSXajazLMCKGB5hnRCidtjay1.jpg";
  }

  const watchProviderSlug = watchProvider && watchProvider.IN
    ? watchProvider.IN.flatrate
      ? getLogoPath(watchProvider.IN.flatrate)
      : watchProvider.IN.buy
        ? getLogoPath(watchProvider.IN.buy)
        : watchProvider.IN.ads
          ? getLogoPath(watchProvider.IN.ads)
          : watchProvider.IN.free
            ? getLogoPath(watchProvider.IN.free)
            : "/seGSXajazLMCKGB5hnRCidtjay1.jpg"
    : "/seGSXajazLMCKGB5hnRCidtjay1.jpg";
  const dateParts = releaseDate.split("-");
  const formattedReleaseDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
  const formattedRuntime = `${Math.floor(runTime / 60)}h ${runTime % 60}m`;
  const rating = Math.floor(voteAverage * 10);

  const handlePlayTrailer = async () => {
    setIsIframeVisible((previousValue) => !previousValue);
    if (!isIframeVisible) {
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "initial";
    }

    setYoutubeId(await fetchYoutubeVideo(id));
  };
  return (
    <>
      <div className={style["movie-info"]}>
        <div className={style["poster-container"]}>
          <img
            className={style.poster}
            src={`${IMAGE_BASE_URL}${posterPath}`}
          />
          {watchProvider && watchProviderSlug ? (
            <div className={style["watch-provider-container"]}>
              <img
                className={style["watch-provider-logo"]}
                src={`${WATCH_PROVIDER_LOGO_BASE_URL}${watchProviderSlug}`}
              />
              <div className={style["watch-provider-link-wrapper"]}>
                <span className={style.label}>Now Streaming</span>
                <a className={style["watch-provider-link"]} href="#">
                  Watch Now
                </a>
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
              {`(${releaseDate.slice(0, 4)})`}
            </span>
          </div>
          <div className={style["info-container"]}>
            {contentType === 'movie' && (
              <>
                <span className={style["release-date"]}>
                  {formattedReleaseDate}
                </span>
                {/* {console.log(originCountry)} */}
                {originCountry.map((country, index) => <span key={index}>{` (${country})`}</span>)}
                <span className={style.divider}>•</span>
              </>
            )}
            <span className={style.genre}>
              {genres.map(({ name }, index) => {
                if (index == 0) {
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
          <div className={style.wrapper}>
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
            {contentType === 'movie' && (
              <div
                className={style["play-link-container"]}
                onClick={handlePlayTrailer}
              >
                <span className={style["play-icon"]} />
                <a className={style["play-link"]} href="#">
                  Play Trailer
                </a>
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
        <span className={style["close-btn"]} onClick={handlePlayTrailer}>
          x
        </span>
      </div>
      <div className={style.content}>
        <iframe
          className={style["yt-iframe"]}
          frameBorder={0}
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&hl=en&modestbranding=1&fs=1&autohide=1`}
          allowFullScreen
        />
      </div>
    </div>
  </div>,
  document.getElementById("portal"),
);

MovieInfo.propTypes = {
  id: PropTypes.string.isRequired,
  notifyError: PropTypes.func.isRequired,
  originalTitle: PropTypes.string,
  overview: PropTypes.string,
  posterPath: PropTypes.string,
  originCountry: PropTypes.arrayOf(PropTypes.string),
  releaseDate: PropTypes.string,
  genres: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
  ),
  runTime: PropTypes.number,
  voteAverage: PropTypes.number,
  creator: PropTypes.string,
  tagLine: PropTypes.string,
  contentType: PropTypes.string.isRequired,
};

export default MovieInfo;
