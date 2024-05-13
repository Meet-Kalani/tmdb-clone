import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./recommendation.module.scss";
import RecommendationCard from "./RecommendationCard/RecommendationCard";
import { fetchRecommendations } from "../../service/api";
import { formatDate } from "../../helpers/formatDate";
import SkeletonLoader from "./SkeletonLoader/SkeletonLoader";

const Recommendation = ({
  id, contentType, notifyError,
}) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchRecommendations(id, contentType);
        setRecommendations(res);
      }
      catch (err) {
        notifyError(err, style.toast);
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, [id, notifyError, contentType]);

  return (
    <div className={style.recommendation}>
      <div className={style["recommendation-header"]}>
        <h3 className={style.title}>Recommendations</h3>
      </div>
      <div className={style["recommendation-body"]}>
        { isLoading ? [...Array(10)].map(() => <SkeletonLoader key={crypto.randomUUID()} />) : recommendations.length > 0 ? recommendations.map(
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
  notifyError: PropTypes.func.isRequired,
};

export default Recommendation;
