import style from "./result-card.module.scss";
import PropTypes from "prop-types";

// check the alignments of card

const ResultCard = ({ poster_path, name, overview, first_air_date }) => {
  const imageSource = poster_path
    ? `https://media.themoviedb.org/t/p/w94_and_h141_bestv2${poster_path}`
    : "https://placehold.jp/14/ccc/ffffff/94x141.png?text=Not%20Found";

  return (
    <div className={`${style["result-card"]} ${style["card"]}`}>
      <img className={style["card-image"]} src={imageSource} alt="" />
      <div className={style["card-content"]}>
        <div>
          <a href="#" className={style["card-title-link"]}>
            <h2 className={style["card-title"]}>{name}</h2>
          </a>
          <span className={style["release-date"]}>{first_air_date}</span>
        </div>
        <div>
          <p className={style["card-description"]}>{overview}</p>
        </div>
      </div>
    </div>
  );
};

ResultCard.propTypes = {
  poster_path: PropTypes.string,
  name: PropTypes.string,
  overview: PropTypes.string,
  first_air_date: PropTypes.string,
};

export default ResultCard;
