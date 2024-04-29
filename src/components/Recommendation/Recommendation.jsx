import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./recommendation.module.scss";
import RecommendationCard from "./RecommendationCard/RecommendationCard";
import { fetchRecommendations } from "../../service/api";
import { formatDate } from "../../utils/helpers";
import SkeletonLoader from "./SkeletonLoader/SkeletonLoader";

const Recommendation = ({
  id, contentType, notifyError,
}) => {
  const [recommendations, setRecommendations] = useState([]);
  const isContentLoaded = recommendations.length > 0;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRecommendations(await fetchRecommendations(id, contentType));
      }
      catch (err) {
        notifyError(err, style.toast);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, notifyError, contentType]);

  return (
    isContentLoaded ? (
      <div className={style.recommendation}>
        <div className={style["recommendation-header"]}>
          <h3 className={style.title}>Recommendations</h3>
        </div>
        <div className={style["recommendation-body"]}>
          { isLoading ? [...Array(10)].map(() => <SkeletonLoader key={crypto.randomUUID()} />) : recommendations.map(
            ({
              id: recommendationId, poster_path: posterPath, original_title: originalTitle, original_name: originalName, vote_average: voteAverage, release_date: releaseDate, first_air_date: firstAIRDate,
            }) => (
              <RecommendationCard
                contentType={contentType}
                id={recommendationId}
                key={recommendationId}
                originalTitle={originalTitle || originalName}
                posterPath={posterPath}
                releaseDate={formatDate(releaseDate || firstAIRDate)}
                voteAverage={Math.floor(voteAverage * 10)}
              />
            ),
          )}
        </div>
      </div>
    ) : undefined
  );
};

Recommendation.propTypes = {
  id: PropTypes.number.isRequired,
  contentType: PropTypes.string.isRequired,
  notifyError: PropTypes.func.isRequired,
};

export default Recommendation;
