import style from "./recommendation.module.scss";
import RecommendationCard from "../RecommendationCard/RecommendationCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchRecommendations } from "../../helpers/DataPullers";
import PropTypes from "prop-types";

function formatDate(inputDate) {
  var parts = inputDate.split("-");
  var formattedDate = parts[1] + "/" + parts[2] + "/" + parts[0];
  return formattedDate;
}

const Recommendation = ({ id ,contentType}) => {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setRecommendations(await fetchRecommendations(id,contentType));
      } catch (err) {
        console.error(err);
        navigate("/not-found");
      }
    };
    fetchData();
  }, [id, navigate,contentType]);

  if (recommendations.length === 0) {
    return;
  }

  return (
    <div className={style["recommendation"]}>
      <div className={style["recommendation-header"]}>
        <h3 className={style["title"]}>Recommendations</h3>
      </div>
      <div className={style["recommendation-body"]}>
        {recommendations.map(
          ({ id, poster_path, original_title,original_name, vote_average, release_date ,first_air_date}) => {
            return (
              <RecommendationCard
                key={id}
                id={id}
                poster_path={poster_path}
                original_title={original_title || original_name}
                vote_average={Math.floor(vote_average * 10)}
                release_date={formatDate(release_date || first_air_date)}
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
  contentType: PropTypes.string
};

export default Recommendation;
