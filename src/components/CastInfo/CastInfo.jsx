import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./cast-info.module.scss";
import { fetchCastData } from "../../service/api";
import CastCard from "./CastCard/CastCard";
import SkeletonLoader from "./SkeletonLoader/SkeletonLoader";

const CastInfo = ({ id, contentType, notifyError }) => {
  const [castData, setCastData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp = await fetchCastData(id, contentType);
        setCastData(temp.slice(0, 9));
      }
      catch (err) {
        notifyError(err, style.toast);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, notifyError, contentType]);

  return (
    <div className={style["cast-info"]}>
      <h3 className={style.title}>Top Billed Cast</h3>
      <div className={style["cast-card-container"]}>
        {
            isLoading ? [...Array(9)].map(() => <SkeletonLoader key={crypto.randomUUID()} />) : castData.map(({
              id: castId, profile_path: profilePath, original_name: originalName, character,
            }) => (
              <CastCard
                characterName={character}
                isLoading={isLoading}
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

CastInfo.propTypes = {
  id: PropTypes.number.isRequired,
  contentType: PropTypes.string.isRequired,
  notifyError: PropTypes.func.isRequired,
};

export default CastInfo;
