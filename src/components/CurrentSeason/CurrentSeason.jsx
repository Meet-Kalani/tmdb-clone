import PropTypes from "prop-types";
import style from "./current-season.module.scss";
import { CURRENT_SEASON_POSTER_BASE_URL } from "../../constants/constants";
import Img from "../Img/Img";

const CurrentSeason = ({ data }) => {
  const {
    air_date: airDate, episode_count: episodeCount, name, overview, poster_path: posterPath, vote_average: voteAverage,
  } = data;

  const airYear = airDate ? airDate.slice(0, 4) : null;
  const rating = Math.floor(voteAverage * 10);

  return (
    <div className={style["current-season"]}>
      <div className={style.header}>
        <h3 className={style.title}>Current Season</h3>
      </div>
      <div className={style.content}>
        <div className={style["poster-container"]}>
          <Img
            alt={`Poster of ${name}`}
            src={`${CURRENT_SEASON_POSTER_BASE_URL}${posterPath}`}
          />
        </div>
        <div className={style["current-season-body"]}>
          <h2 className={style["current-season-title"]}>{name}</h2>
          <div className={style["info-container"]}>
            <div className={style["rating-container"]}>
              <span className={style["star-icon"]} />
              <span className={style["rating-value"]}>
                {rating}
                <span className={style["percentage-sign"]}>%</span>
              </span>
            </div>
            <span className={style["release-year"]}>
              {airYear}
              {' '}
              •
              {' '}
              {`${episodeCount} Episodes`}
            </span>
          </div>
          {overview ? <p className={style.overview}>{overview}</p> : undefined}
        </div>
      </div>
    </div>
  );
};

CurrentSeason.propTypes = {
  data: PropTypes.shape({
    air_date: PropTypes.string,
    episode_count: PropTypes.number,
    name: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
};

export default CurrentSeason;
