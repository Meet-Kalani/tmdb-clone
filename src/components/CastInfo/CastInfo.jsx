import { useEffect, useState } from "react";
import style from "./cast-info.module.scss";
import { fetchCastData } from "../../helpers/DataPullers";
import { useNavigate } from "react-router-dom";
import CastCard from "../CastCard/CastCard";
import PropTypes from "prop-types";

const CastInfo = ({ id ,contentType}) => {
  const [castData, setCastData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp = await fetchCastData(id,contentType);
        setCastData(temp.slice(0, 9));
      } catch (err) {
        navigate("/not-found");
      }
    };

    fetchData();
  }, [id, navigate,contentType]);

  return (
    <div className={style["cast-info"]}>
      <h3 className={style["title"]}>Top Billed Cast</h3>
      <div className={style["cast-card-container"]}>
        {castData.length > 0 &&
          castData.map(({ id, profile_path, original_name, character }) => {
            return (
              <CastCard
                key={id}
                profile_path={profile_path}
                original_name={original_name}
                character_name={character}
              />
            );
          })}
      </div>
    </div>
  );
};

CastInfo.propTypes = {
  id: PropTypes.number,
  contentType:PropTypes.string
};

export default CastInfo;
