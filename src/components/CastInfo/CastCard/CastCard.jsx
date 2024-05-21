import PropTypes from "prop-types";
import style from "./cast-card.module.scss";
import {
  CAST_PROFILE_BASE_URL, LOADER_FEMALE, LOADER_MALE, WOMAN_GENDER_ID,
} from "../../../constants/constants";
import Img from "../../Img/Img";

const CastCard = ({
  profilePath, originalName, characterName, gender,
}) => {
  const loaderImage = gender === WOMAN_GENDER_ID ? LOADER_FEMALE : LOADER_MALE;

  const wrapperStyle = {
    backgroundImage: `url(${loaderImage})`,
  };

  return (
    <div className={style["cast-card"]}>
      <div className={style['profile-wrapper']} style={wrapperStyle}>
        {
          profilePath ? (
            <Img
              alt={originalName}
              className={style["profile-img"]}
              fallbackImageURL="https://placehold.jp/16/ccc/ffffff/138x175.png?text=Not+Found!"
              src={`${CAST_PROFILE_BASE_URL}${profilePath}`}
            />
          ) : undefined
        }
      </div>
      <div className={style["cast-content"]}>
        <span className={style["original-name"]}>{originalName}</span>
        <span className={style["character-name"]}>{characterName}</span>
      </div>
    </div>
  );
};
CastCard.propTypes = {
  profilePath: PropTypes.string,
  originalName: PropTypes.string.isRequired,
  characterName: PropTypes.string.isRequired,
  gender: PropTypes.number.isRequired,
};

CastCard.defaultProps = {
  profilePath: "https://placehold.jp/16/ccc/ffffff/138x175.png?text=Not+Found!",
};

export default CastCard;
