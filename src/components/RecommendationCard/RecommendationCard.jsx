import style from "./recommendation-card.module.scss";
import { RECOMMENDATION_BASE_URL } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const RecommendationCard = ({
  id,
  poster_path,
  original_title,
  vote_average,
  release_date,
}) => {
  const navigate = useNavigate();

  const handleCardOpener = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className={style["recommendation-card"]}>
      <div className={style["wrapper"]}>
        <img
          className={style["recommendation-image"]}
          src={`${RECOMMENDATION_BASE_URL}${poster_path}`}
          onClick={handleCardOpener}
          onError={(e) =>
            (e.target.src =
              "https://placehold.jp/16/ccc/ffffff/250x141.png?text=Not Found!")
          }
        />
        <div className={style["hidden-container"]}>
          <span className={style["calendar-icon"]}></span>
          <span className={style["recommendation-relase_date"]}>
            {release_date}
          </span>
        </div>
      </div>
      <div className={style["recommendation-info"]}>
        <span
          className={style["recommendation-title"]}
          onClick={handleCardOpener}
        >
          {original_title}
        </span>
        <span className={style["recommendation-rating"]}>
          {vote_average}
          <span className={style["percentage-sign"]}>%</span>
        </span>
      </div>
    </div>
  );
};

// was doing the connection on click of the recommendaiton page it shboudl redirect

RecommendationCard.propTypes = {
  id: PropTypes.number,
  poster_path: PropTypes.string,
  original_title: PropTypes.string,
  vote_average: PropTypes.number,
  release_date: PropTypes.string,
};

export default RecommendationCard;
