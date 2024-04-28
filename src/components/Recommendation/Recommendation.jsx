import { useNavigate } from "react-router-dom";
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
}

const Recommendation = ({ id, contentType, notifyError }) => {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();
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
  }, [id, navigate, contentType]);

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
                id, poster_path, original_title, original_name, vote_average, release_date, first_air_date,
              }) => (
                <RecommendationCard
                  id={id}
                  key={id}
                  original_title={original_title || original_name}
                  poster_path={poster_path}
                  release_date={formatDate(release_date || first_air_date)}
                  vote_average={Math.floor(vote_average * 10)}
                />
              ),
            )}
          </div>
        </div>
      ) : undefined
  );
};

Recommendation.propTypes = {
  id: PropTypes.number,
  contentType: PropTypes.string,
  notifyError: PropTypes.func.isRequired,
};

export default Recommendation;
