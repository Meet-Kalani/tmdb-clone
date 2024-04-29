import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./recommendation-card.module.scss";
import { RECOMMENDATION_BASE_URL } from "../../constants/constants";

const RecommendationCard = ({
  id,
  posterPath,
  originalTitle,
  voteAverage,
  releaseDate,
  isTVSeries,
}) => {
  const navigate = useNavigate();

  const handleCardOpener = () => {
    if (isTVSeries) {
      navigate(`/tv/${id}`);
    }
    else {
      navigate(`/movie/${id}`);
    }
  };

  return (
    <div className={style["recommendation-card"]}>
      <div
        className={style.wrapper}
        role="button"
        tabIndex={0}
        onClick={handleCardOpener}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleCardOpener();
          }
        }}
      >
        <img
          alt="Recommended Movie"
          className={style["recommendation-image"]}
          src={`${RECOMMENDATION_BASE_URL}${posterPath}`}
          onError={(e) => {
            (e.target.src = "https://placehold.jp/16/ccc/ffffff/250x141.png?text=Not Found!");
          }}

        />
        <div className={style["hidden-container"]}>
          <span className={style["calendar-icon"]} />
          <span className={style["recommendation-relase_date"]}>
            {releaseDate}
          </span>
        </div>
      </div>
      <div className={style["recommendation-info"]}>
        <span
          className={style["recommendation-title"]}
          role="button"
          tabIndex={0}
          onClick={handleCardOpener}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleCardOpener();
            }
          }}
        >
          {originalTitle}
        </span>
        <span className={style["recommendation-rating"]}>
          {voteAverage}
          <span className={style["percentage-sign"]}>%</span>
        </span>
      </div>
    </div>
  );
};

// was doing the connection on click of the recommendaiton page it shboudl redirect

RecommendationCard.propTypes = {
  id: PropTypes.number.isRequired,
  posterPath: PropTypes.string,
  originalTitle: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
  releaseDate: PropTypes.string,
  isTVSeries: PropTypes.bool.isRequired,
};

RecommendationCard.defaultProps = {
  releaseDate: undefined,
  posterPath: "https://placehold.jp/16/ccc/ffffff/250x141.png?text=Not Found!",
};

export default RecommendationCard;
