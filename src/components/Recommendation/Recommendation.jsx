import PropTypes from "prop-types";
import { formatDate } from "../../utils/helpers";
import style from "./recommendation.module.scss";
import RecommendationCard from "./RecommendationCard/RecommendationCard";
import useRecommendationObserver from "../../hooks/useRecommendationsObserver";

const Recommendation = ({
  id, contentType,
}) => {
  const { recommendations, recommendationRef } = useRecommendationObserver(id, contentType);

  return (
    <div className={style.recommendation} ref={recommendationRef}>
      <div className={style["recommendation-header"]}>
        <h3 className={style.title}>Recommendations</h3>
      </div>
      <div className={style["recommendation-body"]}>
        { recommendations?.length > 0 ? recommendations.map(
          ({
            id: recommendationId, backdrop_path: backdropPath, original_title: originalTitle, original_name: originalName, vote_average: voteAverage, release_date: releaseDate, first_air_date: firstAIRDate,
          }) => (
            <RecommendationCard
              backdropPath={backdropPath}
              contentType={contentType}
              id={recommendationId}
              key={recommendationId}
              originalTitle={originalTitle || originalName}
              releaseDate={formatDate(releaseDate || firstAIRDate)}
              voteAverage={Math.floor(voteAverage * 10)}
            />
          ),
        ) : <span className={style.message}>Sorry! but there is no recommendation at the time.</span>}
      </div>
    </div>
  );
};

Recommendation.propTypes = {
  id: PropTypes.number.isRequired,
  contentType: PropTypes.string.isRequired,
};

export default Recommendation;
