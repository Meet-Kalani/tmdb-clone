import ResultCard from "../ResultCard/ResultCard";
import style from "./result-card-list.module.scss";
import PropTypes from "prop-types";

const ResultCardList = ({ data }) => {
  return (
    <div className={style["result-card-list"]}>
      {data.map(({ id, poster_path, name, overview, first_air_date }) => {
        return (
          <ResultCard
            key={id}
            poster_path={poster_path}
            name={name}
            overview={overview}
            first_air_date={first_air_date}
          />
        );
      })}
    </div>
  );
};

ResultCardList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      poster_path: PropTypes.string,
      name: PropTypes.string,
      overview: PropTypes.string,
      first_air_date: PropTypes.string,
    })
  ),
};

export default ResultCardList;
