import PropTypes from 'prop-types';
import style from "./cast-info.module.scss";
import CastCard from "./CastCard/CastCard";

const CastInfo = ({ castData }) => (
  <div className={style["cast-info"]}>
    <h3 className={style.title}>Top Billed Cast</h3>
    <div className={style["cast-card-container"]}>
      {
             castData.map(({
               id: castId, profile_path: profilePath, original_name: originalName, character, gender,
             }) => (
               <CastCard
                 characterName={character}
                 gender={gender}
                 key={castId}
                 originalName={originalName}
                 profilePath={profilePath}
               />
             ))
          }
    </div>
  </div>
);

CastInfo.propTypes = {
  castData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    profile_path: PropTypes.string,
    original_name: PropTypes.string,
    character: PropTypes.string,
    gender: PropTypes.number,
  })).isRequired,
};

export default CastInfo;
