import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./recommendation.module.scss";
import RecommendationCard from "../RecommendationCard/RecommendationCard";
import { fetchRecommendations } from "../../service/api";

function formatDate(inputDate) {
  if (inputDate) {
    const parts = inputDate.split("-");
    const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
    return formattedDate;
  }
  return null;
}

const Recommendation = ({
  id, contentType, notifyError, isTVSeries,
}) => {
  const [recommendations, setRecommendations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setRecommendations(await fetchRecommendations(id, contentType));
      }
      catch (err) {
        notifyError(err, style.toast);
      }
    };
    fetchData();
  }, [id, notifyError, contentType]);

  return (
    recommendations.length > 0
      ? (
        <div className={style.recommendation}>
          <div className={style["recommendation-header"]}>
            <h3 className={style.title}>Recommendations</h3>
          </div>
          <div className={style["recommendation-body"]}>
            {recommendations.map(
              ({
                id: recommendationId, poster_path: posterPath, original_title: originalTitle, original_name: originalName, vote_average: voteAverage, release_date: releaseDate, first_air_date: firstAIRDate,
              }) => (
                <RecommendationCard
                  id={recommendationId}
                  isTVSeries={isTVSeries}
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
  isTVSeries: PropTypes.bool.isRequired,
};

export default Recommendation;
