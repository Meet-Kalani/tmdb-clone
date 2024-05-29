import PropTypes from "prop-types";
import style from "./cast-card.module.scss";
import {
  CAST_AND_CREW_PROFILE_BASE_URL, LOADER_FEMALE, LOADER_MALE, WOMAN_GENDER_ID,
} from "../../constants/constants";
import Img from "../Img/Img";

const CastCard = ({
  profilePath, name, character, gender,
}) => {
  const loaderImage = gender === WOMAN_GENDER_ID ? LOADER_FEMALE : LOADER_MALE;

  const wrapperStyle = {
    backgroundImage: `url(${loaderImage})`,
  };

  return (
    <div className={style['cast-card']}>
      <div className={style['cast-profile-container']} style={wrapperStyle}>
        <Img alt={name} className={style['cast-profile']} src={`${CAST_AND_CREW_PROFILE_BASE_URL}${profilePath}`} />
      </div>
      <div className={style['cast-info-container']}>
        <span className={style['cast-original-name']}>
          {name}
        </span>
        <span className={style['cast-character-name']}>
          {character}
        </span>
      </div>
    </div>
  );
};

CastCard.propTypes = {
  profilePath: PropTypes.string,
  name: PropTypes.string.isRequired,
  character: PropTypes.string,
  gender: PropTypes.number.isRequired,
};

CastCard.defaultProps = {
  character: undefined,
  profilePath: undefined,
};

export default CastCard;
