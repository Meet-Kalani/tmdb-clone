import { useLoaderData } from "react-router-dom";
import style from "./current-season.module.scss";
import { CURRENT_SEASON_POSTER_BASE_URL } from "../../constants/constants";
import Img from "../Img/Img";

const CurrentSeason = () => {
  const { data } = useLoaderData();

  const {
    air_date: airDate, episode_count: episodeCount, name, overview, poster_path: posterPath, rating,
  } = data.seasons.at(-1);

  const airYear = airDate ? airDate.slice(0, 4) : null;

  return (
    <div className={style["current-season"]}>
      <div className={style.header}>
        <h3 className={style.title}>Current Season</h3>
      </div>
      <div className={style.content}>
        <div className={style["poster-container"]}>
          <Img
            alt="Current Season's Poster"
            fallbackImageURL="https://placehold.jp/16/dbdbdb/ffffff/130x195.png?text=Not+Found!"
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
          <p className={style.overview}>{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentSeason;
