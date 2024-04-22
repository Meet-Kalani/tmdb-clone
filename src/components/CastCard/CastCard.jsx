import style from "./cast-card.module.scss";
import {CAST_PROFILE_BASE_URL} from "../../constants/constants";
import PropTypes from "prop-types";

const CastCard = ({profile_path,original_name,character_name}) => {
  return (
    <div className={style['cast-card']}>
        <img src={`${CAST_PROFILE_BASE_URL}${profile_path}`} className={style['profile-img']} />
        <div className={style['cast-content']}>
            <span className={style['original-name']}>{original_name}</span>
            <span className={style['character-name']}>{character_name}</span>
        </div>
    </div>
  )
}

CastCard.propTypes = {
  profile_path:PropTypes.string,
  original_name:PropTypes.string,
  character_name:PropTypes.string
}

export default CastCard