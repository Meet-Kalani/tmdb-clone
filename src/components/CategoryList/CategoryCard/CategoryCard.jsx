import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import style from "./category-card.module.scss";
import { IMAGE_BASE_URL } from "../../../constants/constants";
import Rating from "../../Rating/Rating";

const CategoryCard = ({
  id, name, posterPath, voteAverage, releaseDate, contentType,
}) => {
  const navigate = useNavigate();

  const handleCardOpener = () => {
    if (contentType === "tv") {
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
      className={style['category-card']}
      role="button"
      tabIndex={0}
      onClick={handleCardOpener}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleCardOpener();
        }
      }}
    >
      <div className={style["card-header"]}>
        {
          posterPath ? (
            <img
              alt="poster of the movie"
              className={style["card-image"]}
              loading="lazy"
              src={`${IMAGE_BASE_URL}${posterPath}`}
            />
          ) : undefined
        }
      </div>
      <div className={style["card-content"]}>
        <div className={style["rating-container"]}>
          <Rating rating={voteAverage} size={38} />
        </div>
        <Link className={style.name} to="/">
          {name}
        </Link>
        <span className={style["launch-date"]}>
          {convertDate(releaseDate)}
        </span>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  posterPath: PropTypes.string,
  voteAverage: PropTypes.number,
  releaseDate: PropTypes.string,
  contentType: PropTypes.string.isRequired,
};

CategoryCard.defaultProps = {
  id: undefined,
  name: undefined,
  posterPath: undefined,
  voteAverage: undefined,
  releaseDate: undefined,
};
export default CategoryCard;
