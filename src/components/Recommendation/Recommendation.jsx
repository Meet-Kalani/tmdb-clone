import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { formatDate, notifyError } from "../../utils/helpers";
import style from "./recommendation.module.scss";
import RecommendationCard from "./RecommendationCard/RecommendationCard";
import { fetchRecommendations } from "../../service/api";

const Recommendation = ({
  id, contentType,
}) => {
  const [recommendations, setRecommendations] = useState([]);
  const recommendationRef = useRef();

  useEffect(() => {
    const recommendationRefCurrent = recommendationRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (async () => {
            try {
              const res = await fetchRecommendations(id, contentType);
              setRecommendations(res);
            }
            catch (err) {
              notifyError(err);
            }
            finally {
              observer.unobserve(recommendationRefCurrent);
            }
          })();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );

    if (recommendationRefCurrent) {
      observer.observe(recommendationRefCurrent);
    }

    return () => {
      if (recommendationRefCurrent) {
        observer.unobserve(recommendationRefCurrent);
      }
    };
  }, [contentType, id]);

  return (
    <div className={style.recommendation} ref={recommendationRef}>
      <div className={style["recommendation-header"]}>
        <h3 className={style.title}>Recommendations</h3>
      </div>
      <div className={style["recommendation-body"]}>
        { recommendations.length > 0 ? recommendations.map(
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
