import { useEffect, useState } from "react";
import { fetchKeywordsData } from "../../../helpers/DataPullers";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./keywords.module.scss";

const Keywords = ({ id, contentType }) => {
  const [keywords, setKeywords] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setKeywords(await fetchKeywordsData(id, contentType));
      } catch (err) {
        console.error(err);
        navigate("/not-found");
      }
    };

    fetchData();
  }, [id, navigate, contentType]);

  const isVisible =
    contentType === "movie"
      ? keywords && keywords.keywords && keywords.keywords.length > 0
      : keywords && keywords.results && keywords.results.length > 0;

  return (
    isVisible && (
      <div className={style["keywords-container"]}>
        <span className={style["label"]}>Keywords</span>
        <div className={style["keywords-wrapper"]}>
          {contentType === "movie"
            ? keywords.keywords.map(({ id, name }) => {
                return (
                  <Link key={id} to="/" className={style["keyword"]}>
                    {name}
                  </Link>
                );
              })
            : keywords.results.map(({ id, name }) => {
                return (
                  <Link key={id} to="/" className={style["keyword"]}>
                    {name}
                  </Link>
                );
              })}
        </div>
      </div>
    )
  );
};

Keywords.propTypes = {
  id: PropTypes.number,
  contentType: PropTypes.string,
};

export default Keywords;
