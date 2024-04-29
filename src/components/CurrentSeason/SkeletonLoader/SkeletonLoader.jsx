import style from "./skeleton-loader.module.scss";

const SkeletonLoader = () => (
  <div className={style["current-season"]}>
    <div className={style.header}>
      <h3 className={style.title}>Current Season</h3>
    </div>
    <div className={style.content}>
      <div className={style["poster-container"]}>
        <div className={style.poster}>
          <span>Loading...</span>
        </div>
      </div>
      <div className={style["current-season-body"]}>
        <h2 className={style["current-season-title"]}>Loading...</h2>
        <div className={style["info-container"]}>
          <div className={style["rating-container"]}>
            <span className={style["star-icon"]} />
            <span className={style["rating-value"]}>
              100
              <span className={style["percentage-sign"]}>%</span>
            </span>
          </div>
        </div>
        <p className={style.overview}>Loading...</p>
      </div>
    </div>
  </div>
);

export default SkeletonLoader;
