import style from "./movie-info.module.scss";
import {
  IMAGE_BASE_URL,
  WATCH_PROVIDER_LOGO_BASE_URL,
} from "../../constants/constants";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  fetchWatchProviders,
  fetchYoutubeVideo,
} from "../../helpers/DataPullers";
import Rating from "../Rating/Rating";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

// implement trailer fix user score fix rating color also there is diff color accordingl
// fix rating background circle color
const MovieInfo = ({
  id,
  original_title,
  overview,
  poster_path,
  origin_country,
  release_date,
  genres,
  runtime,
  vote_average,
  tagline,
}) => {
  const [watchProvider, setWatchProvider] = useState({});
  const [isIframeVisible, setIsIframeVisible] = useState(false);
  const [youtubeId, setYoutubeId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetchWatchProviders(id).then((res) => setWatchProvider({ US: res }));
    } catch (err) {
      navigate("/not-found");
    }
  }, [id, navigate]);
  console.log(watchProvider)
  const watchProviderLogo = "s";
  // Object.keys(watchProvider).length > 0 && watchProvider.US.buy[0].logo_path;
  const dateParts = release_date.split("-");
  const formattedReleaseDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
  const formattedRuntime = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
  const rating = Math.floor(vote_average * 10);

  const handlePlayTrailer = async () => {
    setIsIframeVisible((previousValue) => !previousValue);
    setYoutubeId(await fetchYoutubeVideo(id));
  };
  return (
    <>
      <div className={style["movie-info"]}>
        <div className={style["poster-container"]}>
          <img
            src={`${IMAGE_BASE_URL}${poster_path}`}
            className={style["poster"]}
          />
          <div className={style["watch-provider-container"]}>
            <img
              className={style["watch-provider-logo"]}
              src={`${WATCH_PROVIDER_LOGO_BASE_URL}${watchProviderLogo}`}
            />
            <div className={style["watch-provider-link-wrapper"]}>
              <span className={style["label"]}>Now Streaming</span>
              <a href="#" className={style["watch-provider-link"]}>
                Watch Now
              </a>
            </div>
          </div>
        </div>
        <div className={style["content"]}>
          <div className={style["name-container"]}>
            <h2 className={style["name"]}>{original_title}</h2>
            <span
              className={style["release-year"]}
            >{`(${release_date.slice(0, 4)})`}</span>
          </div>
          <div className={style["info-container"]}>
            <span className={style["release-date"]}>
              {formattedReleaseDate}
            </span>
            {origin_country.map((country, index) => {
              return <span key={index}>{` (${country})`}</span>;
            })}
            <span className={style['divider']}>•</span>
            <span className={style["genre"]}>
              {genres.map(({ name },index) => {
                if(index == 0){
                  return `${name}`;
                } else {
                  return `, ${name}`;
                }
              })}
            </span>
            <span className={style['divider']}>•</span>
            <span className={style["genre"]}>{formattedRuntime}</span>
          </div>
          <div className={style["wrapper"]}>
            <div className={style["rating-container"]}>
              <Rating rating={rating} size={68} />
              <span className={style["rating-title"]}>
                User <br /> Score
              </span>
            </div>
            <div
              className={style["play-link-container"]}
              onClick={handlePlayTrailer}
            >
              <span className={style["play-icon"]}></span>
              <a href="#" className={style["play-link"]}>
                Play Trailer
              </a>
            </div>
          </div>
          <div className={style["overview-container"]}>
            <span className={style["tagline"]}>{tagline}</span>
            <span className={style["overview-title"]}>Overview</span>
            <p className={style["overview"]}>{overview}</p>
          </div>
        </div>
      </div>
      {isIframeVisible && (
        <PlayTrailer
          handlePlayTrailer={handlePlayTrailer}
          youtubeId={youtubeId}
        />
      )}
    </>
  );
};

const PlayTrailer = ({ handlePlayTrailer, youtubeId }) => {
  return createPortal(
    <div className={style["backdrop"]}>
      <div className={style["play-trailer"]}>
        <div className={style["header"]}>
          <span className={style["title"]}>Play Trailer</span>
          <span className={style["close-btn"]} onClick={handlePlayTrailer}>
            x
          </span>
        </div>
        <div className={style["content"]}>
          <iframe
            width={1179}
            height={662}
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&hl=en&modestbranding=1&fs=1&autohide=1`}
            allowFullScreen
            frameBorder={0}
          ></iframe>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

MovieInfo.propTypes = {
  id: PropTypes.string,
  original_title: PropTypes.string,
  overview: PropTypes.string,
  poster_path: PropTypes.string,
  origin_country: PropTypes.arrayOf(PropTypes.string),
  release_date: PropTypes.string,
  genres: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
  ),
  runtime: PropTypes.number,
  vote_average: PropTypes.number,
  tagline: PropTypes.string,
};

export default MovieInfo;
