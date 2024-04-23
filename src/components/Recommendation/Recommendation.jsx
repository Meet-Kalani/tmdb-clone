import style from "./recommendation.module.scss";
import RecommendationCard from "../RecommendationCard/RecommendationCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchRecommendations } from "../../helpers/DataPullers";
import PropTypes from "prop-types";

const Recommendation = ({ id }) => {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setRecommendations(await fetchRecommendations(id));
      } catch (err) {
        console.error(err);
        navigate("/not-found");
      }
    };
    fetchData();
  }, [id, navigate]);
  return (
    <div className={style["recommendation"]}>
      <div className={style["recommendation-header"]}>
        <h3 className={style["title"]}>Recommendations</h3>
      </div>
      <div className={style["recommendation-body"]}>
        {recommendations.map(
          ({ id, poster_path, original_title, vote_average }) => {
            return (
              <RecommendationCard
                key={id}
                poster_path={poster_path}
                original_title={original_title}
                vote_average={Math.floor(vote_average * 10)}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

Recommendation.propTypes = {
  id: PropTypes.number,
};

export default Recommendation;
