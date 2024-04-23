import { CircularProgress } from "@mui/material";
import style from "./rating.module.scss";
import PropTypes from "prop-types";

const Rating = ({ rating, size }) => {
  const ratingColor =
    rating >= 70
      ? "green"
      : rating < 70 && rating >= 40
        ? "yellow"
        : rating < 40 && rating > 0 && "red";

  const ratingColorInner =
    rating >= 70
      ? "green-inner"
      : rating < 70 && rating >= 40
        ? "yellow-inner"
        : rating < 40 && rating > 0 && "red-inner";

  return (
    <div className={style["rating-container"]}>
      <div className={style["wrapper"]}>
        <CircularProgress
          variant="determinate"
          className={`${style["rating-progressbar"]} ${style[ratingColor]}`}
          value={rating}
          thickness={3}
          size={size}
        />
        <CircularProgress
          variant="determinate"
          className={`${style[ratingColorInner]}`}
          value={100}
          thickness={3}
          size={size}
        />
      </div>
      <span className={style["rating-count"]}>
        {rating}
        <span className={style["percentage-sign"]}>%</span>
      </span>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
  size: PropTypes.number,
};

export default Rating;
