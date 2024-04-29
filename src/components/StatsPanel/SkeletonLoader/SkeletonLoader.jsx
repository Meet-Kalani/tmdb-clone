import PropTypes from "prop-types";
import style from "./skeleton-loader.module.scss";

const SkeletonLoader = ({ contentType }) => (
  <div className={style["stats-panel"]}>
    <div className={style.wrapper}>
      <span className={style.label}>Status</span>
      <span>Loading...</span>
    </div>
    {contentType === "tv" ? (
      <div className={style.wrapper}>
        <span className={style.label}>Type</span>
        <span>Loading...</span>
      </div>
    ) : undefined}
    <div className={style.wrapper}>
      <span className={style.label}>Original Language</span>
      <span>Loading...</span>
    </div>
    {contentType === "movie" ? (
      <>
        <div className={style.wrapper}>
          <span className={style.label}>Budget</span>
          <span>$xx,xxx,xxx.xx</span>
        </div>
        <div className={style.wrapper}>
          <span className={style.label}>Revenue</span>
          <span>$xx,xxx,xxx.xx</span>
        </div>
      </>
    ) : undefined}
  </div>
);

SkeletonLoader.propTypes = {
  contentType: PropTypes.string.isRequired,
};

export default SkeletonLoader;
