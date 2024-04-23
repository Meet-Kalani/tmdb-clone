import Rating from "../Rating/Rating";
import PropTypes from "prop-types";
import style from "./movie-card.module.scss";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../constants/constants";

const MovieCard = ({
  id,
  original_title,
  release_date,
  poster_path,
  vote_average,
}) => {
  const navigate = useNavigate();

  const handleCardOpener = () => {
    navigate(`/movie/${id}`);
  };

  const convertDate = (date, month = "short") => {
    return new Date(date).toLocaleString("en-US", {
      day: "numeric",
      month: month,
      year: "numeric",
    });
  };

  return (
    <div className={style["wrapper"]} onClick={handleCardOpener}>
      <div className={style["card"]}>
        <div className={style["card-header"]}>
          <img
            className={style["card-image"]}
            src={`${IMAGE_BASE_URL}${poster_path}`}
          />
        </div>
        <div className={style["card-content"]}>
          <div className={style["rating-container"]}>
            <Rating rating={Math.round(vote_average * 10)} size={38} />
          </div>
          <a href="#" className={style["movie-name"]}>
            {original_title}
          </a>
          <span className={style["movie-launch-date"]}>
            {convertDate(release_date)}
          </span>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number,
  original_title: PropTypes.string,
  release_date: PropTypes.string,
  poster_path: PropTypes.string,
  vote_average: PropTypes.number,
};

export default MovieCard;
