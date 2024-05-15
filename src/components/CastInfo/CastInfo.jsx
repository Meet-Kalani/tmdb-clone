import { useLoaderData } from "react-router-dom";
import style from "./cast-info.module.scss";
import CastCard from "./CastCard/CastCard";

const CastInfo = () => {
  const castData = useLoaderData().castData.slice(0, 9);

  return (
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
};

export default CastInfo;
