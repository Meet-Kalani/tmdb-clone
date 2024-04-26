import style from "./current-season.module.scss";
import { CURRENT_SEASON_POSTER_BASE_URL } from "../../constants/constants";
import PropTypes from "prop-types";

const CurrentSeason = ({
  name,
  episode_count,
  air_date,
  overview,
  rating,
  poster_path,
}) => {
  return (
    <div className={style["current-season"]}>
      <div className={style["header"]}>
        <h3 className={style["title"]}>Current Season</h3>
      </div>
      <div className={style["content"]}>
        <div className={style["poster-container"]}>
          <img
            src={`${CURRENT_SEASON_POSTER_BASE_URL}${poster_path}`}
            onError={(e) =>
              (e.target.src =
                "https://placehold.jp/16/ccc/ffffff/130x195.png?text=Not Found!")
            }
          />
        </div>
        <div className={style["current-season-body"]}>
          <h2 className={style["current-season-title"]}>{name}</h2>
          <div className={style["info-container"]}>
            <div className={style["rating-container"]}>
              <span className={style["star-icon"]}></span>
              <span className={style["rating-value"]}>
                {rating}
                <span className={style["percentage-sign"]}>%</span>
              </span>
            </div>
            <span className={style["release-year"]}>
              {air_date.slice(0, 4)} • {`${episode_count} Episodes`}
            </span>
          </div>
          <p className={style["overview"]}>{overview}</p>
        </div>
      </div>
    </div>
  );
};

CurrentSeason.propTypes = {
  name: PropTypes.string,
  episode_count: PropTypes.number,
  air_date: PropTypes.string,
  overview: PropTypes.string,
  poster_path: PropTypes.string,
  rating: PropTypes.number,
};

export default CurrentSeason;
