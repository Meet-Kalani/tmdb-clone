import style from "./skeleton-loader.module.scss";

const SkeletonLoader = () => (
  <div className={style["recommendation-card"]}>
    <div
      className={style.wrapper}
    >
      <div className={style["recommendation-image"]}>
        <span>Loading...</span>
      </div>
    </div>
    <div className={style["recommendation-info"]}>
      <span
        className={style["recommendation-title"]}
      >
        Loading...
      </span>
      <span className={style["recommendation-rating"]}>
        Loading...
      </span>
    </div>
  </div>
);

export default SkeletonLoader;
