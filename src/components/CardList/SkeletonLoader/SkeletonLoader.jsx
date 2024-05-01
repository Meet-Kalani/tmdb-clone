import style from "./skeleton-loader.module.scss";

const SkeletonLoader = () => (
  <div className={style["skeleton-loader"]}>
    <div className={style["image-loader"]}>Loading...</div>
    <div className={style["rating-loader-container"]}>
      <span className={style["rating-loader"]}>NR</span>
    </div>
  </div>
);

export default SkeletonLoader;
