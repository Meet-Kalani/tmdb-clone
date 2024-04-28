import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import Rating from "../Rating/Rating";
import style from "./movie-card.module.scss";
import { IMAGE_BASE_URL } from "../../constants/constants";

const MovieCard = ({
  id,
  original_title: originalTitle,
  release_date: releaseDate,
  poster_path: posterPath,
  vote_average: voteAverage,
  selectedTab,
}) => {
  const navigate = useNavigate();

  const handleCardOpener = () => {
    if (selectedTab === "On TV") {
      navigate(`/tv/${id}`);
    }
    else {
      navigate(`/movie/${id}`);
    }
  };

  const convertDate = (date, month = "short") => new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month,
    year: "numeric",
  });

  return (
    <div
      className={style.wrapper}
      role="button"
      tabIndex={0}
      onClick={handleCardOpener}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleCardOpener();
        }
      }}
    >
      <div className={style.card}>
        <div className={style["card-header"]}>
          <img
            alt="poster of the movie"
            className={style["card-image"]}
            src={`${IMAGE_BASE_URL}${posterPath}`}
          />
        </div>
        <div className={style["card-content"]}>
          <div className={style["rating-container"]}>
            <Rating rating={Math.round(voteAverage * 10)} size={38} />
          </div>
          <Link className={style["movie-name"]} to="/">
            {originalTitle}
          </Link>
          <span className={style["movie-launch-date"]}>
            {convertDate(releaseDate)}
          </span>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  original_title: PropTypes.string.isRequired,
  release_date: PropTypes.string,
  selectedTab: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
};

export default MovieCard;
