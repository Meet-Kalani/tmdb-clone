import style from "./skeleton-loader.module.scss";

const SkeletonLoader = () => (
  <div className={style["cast-card"]}>
    <div className={style['profile-img']}>
      <span>Loading...</span>
    </div>
    <div className={style["cast-content"]}>
      <span className={style["original-name"]}>Loading...</span>
      <span className={style["character-name"]}>Loading...</span>
    </div>
  </div>
);

export default SkeletonLoader;
