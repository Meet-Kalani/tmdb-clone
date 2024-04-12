import PropTypes from "prop-types";
import style from "./card.module.scss";

// correct the img src

const Card = ({ original_title, release_date, poster_path, vote_average }) => {
  return (
    <div className={style["wrapper"]}>
      <div className={style["card"]}>
        <div className={style["card-header"]}>
          <img
            className={style["card-image"]}
            src={`https://media.themoviedb.org/t/p/w220_and_h330_face${poster_path}`}
          />
        </div>
        <div className={style["card-content"]}>
          <div className={style["liked-container"]}>
            <span className={style["liked"]}>
              {Math.round(vote_average * 10)}
            </span>
          </div>
          <a href="#" className={style["movie-name"]}>
            {original_title}
          </a>
          <span className={style["movie-launch-date"]}>{release_date}</span>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  original_title: PropTypes.string,
  release_date: PropTypes.string,
  poster_path: PropTypes.string,
  vote_average: PropTypes.number,
};

export default Card;
