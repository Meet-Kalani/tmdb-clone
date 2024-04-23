import style from "./recommendation-card.module.scss";
import { RECOMMENDATION_BASE_URL } from "../../constants/constants";
import PropTypes from "prop-types";

const RecommendationCard = ({ poster_path, original_title, vote_average }) => {
  return (
    <div className={style["recommendation-card"]}>
      <img
        className={style["recommendation-image"]}
        src={`${RECOMMENDATION_BASE_URL}${poster_path}`}
      />
      <div className={style["recommendation-info"]}>
        <span className={style["recommendation-title"]}>{original_title}</span>
        <span className={style["recommendation-rating"]}>
          {vote_average}
          <span className={style["percentage-sign"]}>%</span>
        </span>
      </div>
    </div>
  );
};

RecommendationCard.propTypes = {
  poster_path: PropTypes.string,
  original_title: PropTypes.string,
  vote_average: PropTypes.number,
};

export default RecommendationCard;
