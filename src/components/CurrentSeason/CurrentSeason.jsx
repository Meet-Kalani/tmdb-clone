import PropTypes from "prop-types";
import style from "./current-season.module.scss";
import { CURRENT_SEASON_POSTER_BASE_URL } from "../../constants/constants";

const CurrentSeason = ({
  name,
  episodeCount,
  airDate,
  overview,
  rating,
  posterPath,
}) => (
  <div className={style["current-season"]}>
    <div className={style.header}>
      <h3 className={style.title}>Current Season</h3>
    </div>
    <div className={style.content}>
      <div className={style["poster-container"]}>
        <img
          alt="Current Season's Poster"
          src={`${CURRENT_SEASON_POSTER_BASE_URL}${posterPath}`}
          onError={(e) => {
            e.target.src = "https://placehold.jp/16/ccc/ffffff/130x195.png?text=Not Found!";
          }}
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
            {airDate.slice(0, 4)}
            {' '}
            •
            {`${episodeCount} Episodes`}
          </span>
        </div>
        <p className={style.overview}>{overview}</p>
      </div>
    </div>
  </div>
);

CurrentSeason.propTypes = {
  name: PropTypes.string.isRequired,
  episodeCount: PropTypes.number.isRequired,
  airDate: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  posterPath: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default CurrentSeason;
