import style from "./skeleton-loader.module.scss";
import Rating from "../../Rating/Rating";

const SkeletonLoader = () => (
  <div className={style["movie-info"]}>
    <div className={style["poster-container"]}>
      <span>Loading...</span>

    </div>
    <div className={style.content}>
      <div className={style["name-container"]}>
        <h2 className={style.name}>Loading...</h2>
      </div>
      <div className={style["info-container"]}>
        <span className={style["release-date"]}>
          Loading...
        </span>
      </div>
      <div className={style.wrapper}>
        <div className={style["rating-container"]}>
          <Rating rating={100} size={68} />
          <span className={style["rating-title"]}>
            User
            {' '}
            <br />
            {' '}
            Score
          </span>
        </div>
      </div>
      <div className={style["overview-container"]}>
        <span className={style.tagline}>Loading...</span>
        <span className={style["overview-title"]}>Overview</span>
        <p className={style.overview}>Loading...</p>
      </div>
      <div className={style["creator-container"]}>
        <span className={style["creator-name"]}>Loading...</span>
        <span className={style["creator-label"]}>Creator</span>
      </div>
    </div>
  </div>
);

export default SkeletonLoader;
