import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./recommendation-card.module.scss";
import { RECOMMENDATION_BASE_URL } from "../../../constants/constants";
import Img from "../../Img/Img";

const RecommendationCard = ({
  id,
  backdropPath,
  originalTitle,
  voteAverage,
  releaseDate,
  contentType,
}) => {
  const navigate = useNavigate();

  const getPath = () => (contentType === "tv" ? `/tv/${id}` : `/movie/${id}`);

  const handleCardOpener = () => {
    const path = getPath();
    navigate(path);
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
        <Img
          alt="Recommended Movie"
          className={style["recommendation-image"]}
          fallbackImageURL="https://placehold.jp/16/ccc/ffffff/250x141.png?text=Not+Found!"
          src={`${RECOMMENDATION_BASE_URL}${backdropPath}`}
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

RecommendationCard.propTypes = {
  id: PropTypes.number.isRequired,
  backdropPath: PropTypes.string,
  originalTitle: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
  releaseDate: PropTypes.string,
  contentType: PropTypes.string.isRequired,
};

RecommendationCard.defaultProps = {
  releaseDate: undefined,
  backdropPath: "https://placehold.jp/16/ccc/ffffff/250x141.png?text=Not+Found!",
};

export default RecommendationCard;
