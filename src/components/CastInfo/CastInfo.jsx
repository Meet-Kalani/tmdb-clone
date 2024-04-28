import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./cast-info.module.scss";
import { fetchCastData } from "../../service/api";
import CastCard from "../CastCard/CastCard";

const CastInfo = ({ id, contentType, notifyError }) => {
  const [castData, setCastData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp = await fetchCastData(id, contentType);
        setCastData(temp.slice(0, 9));
      }
      catch (err) {
        notifyError(err, style.toast);
      }
    };

    fetchData();
  }, [id, notifyError, contentType]);

  return (
    <div className={style["cast-info"]}>
      <h3 className={style.title}>Top Billed Cast</h3>
      <div className={style["cast-card-container"]}>
        {castData.length > 0
          && castData.map(({
            id, profile_path, original_name, character,
          }) => (
            <CastCard
              character_name={character}
              key={id}
              original_name={original_name}
              profile_path={profile_path}
            />
          ))}
      </div>
    </div>
  );
};

CastInfo.propTypes = {
  id: PropTypes.number,
  contentType: PropTypes.string,
  notifyError: PropTypes.func.isRequired,
};

export default CastInfo;
