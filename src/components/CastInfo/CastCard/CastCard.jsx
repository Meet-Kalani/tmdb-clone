import PropTypes from "prop-types";
import style from "./cast-card.module.scss";
import { CAST_PROFILE_BASE_URL } from "../../../constants/constants";

const CastCard = ({ profilePath, originalName, characterName }) => (
  <div className={style["cast-card"]}>
    <div className={style['profile-wrapper']}>
      <img
        alt="Movie Cast"
        className={style["profile-img"]}
        loading="lazy"
        src={`${CAST_PROFILE_BASE_URL}${profilePath}`}
        onError={(e) => {
          e.target.src = "https://placehold.jp/16/ccc/ffffff/138x175.png?text=Not+Found!";
        }}
      />
    </div>
    <div className={style["cast-content"]}>
      <span className={style["original-name"]}>{originalName}</span>
      <span className={style["character-name"]}>{characterName}</span>
    </div>
  </div>
);

CastCard.propTypes = {
  profilePath: PropTypes.string,
  originalName: PropTypes.string.isRequired,
  characterName: PropTypes.string.isRequired,
};

CastCard.defaultProps = {
  profilePath: "https://placehold.jp/16/ccc/ffffff/138x175.png?text=Not+Found!",
};

export default CastCard;
