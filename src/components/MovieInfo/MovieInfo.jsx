import style from "./movie-info.module.scss";
import { CircularProgress } from "@mui/material";
import {
  IMAGE_BASE_URL,
  WATCH_PROVIDER_LOGO_BASE_URL,
} from "../../constants/constants";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { fetchWatchProviders } from "../../helpers/DataPullers";

// implement trailer fix user score fix rating color also there is diff color accordingl

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

  useEffect(() => {
    fetchWatchProviders(id).then((res) => setWatchProvider({ US: res }));
  }, [id]);

  const watchProviderLogo =
    Object.keys(watchProvider).length > 0 && watchProvider.US.buy[0].logo_path;
  const dateParts = release_date.split("-");
  const formattedReleaseDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
  const formattedRuntime = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
  const rating = Math.floor(vote_average * 10);

  return (
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
          <span className={style["release-date"]}>{formattedReleaseDate}</span>
          {origin_country.map((country, index) => {
            return <span key={index}>{country}</span>;
          })}
          <span className={style["genre"]}>
            {genres.map(({ name }) => {
              return `${name}, `;
            })}
          </span>
          <span className={style["genre"]}>{formattedRuntime}</span>
        </div>
        <div className={style["wrapper"]}>
          {/* user score and trailer */}
          <div className={style["rating-container"]}>
            <div>
              <CircularProgress
                variant="determinate"
                className={style["rating-progressbar"]}
                value={rating}
                size={60}
              />
              <span className={style["rating-count"]}>
                {rating}
                <span className={style["percentage-sign"]}>%</span>{" "}
              </span>
            </div>
            {/* <span>User Score</span> */}
          </div>
          <div className={style["play-link-container"]}>
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
