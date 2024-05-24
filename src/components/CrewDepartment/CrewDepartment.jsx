import PropTypes from "prop-types";
import CastCard from "../CastCard/CastCard";
import style from "./crew-department.module.scss";
import { mapCrewByDepartment } from "../../helpers/mapCrewByDepartment";

const CrewDepartment = ({ department, crew }) => {
  const aggregatedCrew = mapCrewByDepartment(department, crew);

  if (aggregatedCrew.length === 0) {
    return null;
  }

  return (
    <div className={style.wrapper}>
      <span className={style['department-title']}>{department}</span>
      {aggregatedCrew.map(({
        profilePath, name, gender, jobs, id,
      }) => (
        <CastCard
          character={jobs.join(', ')}
          gender={gender}
          key={id}
          name={name}
          profilePath={profilePath}
        />
      ))}
    </div>
  );
};

CrewDepartment.propTypes = {
  department: PropTypes.string.isRequired,
  crew: PropTypes.arrayOf(
    PropTypes.shape({
      profile_path: PropTypes.string,
      character: PropTypes.string,
      name: PropTypes.string,
      gender: PropTypes.number,
      id: PropTypes.number.isRequired,
      job: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default CrewDepartment;
