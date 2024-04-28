import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { fetchKeywordsData } from "../../../service/api";
import style from "./keywords.module.scss";

const Keywords = ({ id, contentType }) => {
  const [keywords, setKeywords] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setKeywords(await fetchKeywordsData(id, contentType));
      }
      catch (err) {
        console.error(err);
        navigate("/not-found");
      }
    };

    fetchData();
  }, [id, navigate, contentType]);

  const isVisible = contentType === "movie"
    ? keywords && keywords.keywords && keywords.keywords.length > 0
    : keywords && keywords.results && keywords.results.length > 0;

  return (
    isVisible && (
      <div className={style["keywords-container"]}>
        <span className={style.label}>Keywords</span>
        <div className={style["keywords-wrapper"]}>
          {contentType === "movie"
            ? keywords.keywords.map(({ id, name }) => (
              <Link className={style.keyword} key={id} to="/">
                {name}
              </Link>
            ))
            : keywords.results.map(({ id, name }) => (
              <Link className={style.keyword} key={id} to="/">
                {name}
              </Link>
            ))}
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
