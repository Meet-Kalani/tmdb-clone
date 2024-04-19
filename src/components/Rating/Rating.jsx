import { CircularProgress } from "@mui/material";
import style from "./rating.module.scss";
import PropTypes from "prop-types";

const Rating = ({ rating, size }) => {
  const ratingColor =
    rating >= 70
      ? "green"
      : rating < 70 && rating >= 40
        ? "yellow"
        : rating < 40 && rating > 0
          && "red";

  return (
    <div className={style["rating-container"]}>
      <CircularProgress
        variant="determinate"
        className={`${style["rating-progressbar"]} ${style[ratingColor]}`}
        value={rating}
        thickness={3}
        size={size}
      />
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
