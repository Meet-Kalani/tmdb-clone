import { CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import style from "./rating.module.scss";

const Rating = ({ rating, size }) => {
  const ratingColor = rating >= 70
    ? "green"
    : rating < 70 && rating >= 40
      ? "yellow"
      : rating < 40 && rating > 0 && "red";

  const ratingColorInner = rating >= 70
    ? "green-inner"
    : rating < 70 && rating >= 40
      ? "yellow-inner"
      : rating < 40 && rating > 0 && "red-inner";

  return (
    <div className={style["rating-container"]}>
      <div className={style.wrapper}>
        <CircularProgress
          className={`${style["rating-progressbar"]} ${style[ratingColor]}`}
          size={size}
          thickness={3}
          value={rating}
          variant="determinate"
        />
        <CircularProgress
          className={`${style[ratingColorInner]}`}
          size={size}
          thickness={3}
          value={100}
          variant="determinate"
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
  rating: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};

export default Rating;
