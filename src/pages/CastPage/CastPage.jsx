import style from "./cast-page.module.scss";
import { fetchCastData } from "../../service/api";
import CastCard from "../../components/CastCard/CastCard";
import Spinner from "../../components/Spinner/Spinner";
import { CREW_DEPARTMENTS } from "../../utils/crewDepartments";
import CrewDepartment from "../../components/CrewDepartment/CrewDepartment";
import useFetchData from "../../hooks/useFetchData";

const CastPage = () => {
  const { data: castData, isLoading } = useFetchData(fetchCastData);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={style['cast-page']}>
      <div className={style.cast}>
        <h3 className={style['cast-title']}>
          Cast
          {' '}
          <span className={style['cast-count']}>{castData.cast.length}</span>
        </h3>
        <div className={style['cards-container']}>
          {
            castData.cast.map(({
              profile_path: profilePath, character, name, gender, id: castId,
            }) => <CastCard character={character} gender={gender} key={castId} name={name} profilePath={profilePath} />)
          }
        </div>
      </div>
      <div className={style.crew}>
        <h3 className={style['crew-title']}>
          Crew
          {' '}
          <span className={style['crew-count']}>{castData.crew.length}</span>
        </h3>
        <div className={style['cards-container']}>
          {CREW_DEPARTMENTS.map((department) => (
            <CrewDepartment crew={castData.crew} department={department} key={department} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CastPage;
