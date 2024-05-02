import style from "./skeleton-loader.module.scss";
import Rating from "../../../Rating/Rating";

const SkeletonLoader = () => (
  <div
    className={style.wrapper}
  >
    <div className={style['category-card']}>
      <div className={style["card-header"]}>
        <div className={style['card-image']}>
          <span>Loading...</span>
        </div>
      </div>
      <div className={style["card-content"]}>
        <div className={style["rating-container"]}>
          <Rating rating={100} size={38} />
        </div>
        <span className={style.name}>
          Loading...
        </span>
        <span className={style["launch-date"]}>
          Loading...
        </span>
      </div>
    </div>
  </div>
);

export default SkeletonLoader;
