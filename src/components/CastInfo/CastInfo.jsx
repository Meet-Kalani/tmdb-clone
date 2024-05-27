import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from "./cast-info.module.scss";
import CastCard from "./CastCard/CastCard";

const CastInfo = ({ castData, contentType, id }) => (
  <div className={style["cast-info"]}>
    <h3 className={style.title}>{contentType === 'tv' ? 'Series Cast' : 'Top Billed Cast'}</h3>
    <div className={style["cast-card-container"]}>
      {
        castData.slice(0, 9).map(({
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
      <div className={style['view-more']}>
        <Link
          className={style['view-more-link']}
          to={`/${contentType}/${id}/cast`}
        >
          View More
          <span className={style['right-arrow']} />
        </Link>
      </div>
    </div>
    <Link
      className={style['full-cast-link']}
      to={`/${contentType}/${id}/cast`}
    >
      Full Cast & Crew
    </Link>
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
  contentType: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default CastInfo;
