import style from "./skeleton-loader.module.scss";

const UserReview = () => (
  <div className={style["user-review"]}>
    <div className={style["review-header"]}>
      <h3 className={style["review-title"]}>Social</h3>
      <span className={style["review-count-container"]}>
        Reviews
      </span>
    </div>
    <div className={style["review-body"]}>
      <span>Loading...</span>
    </div>
  </div>
);

export default UserReview;
