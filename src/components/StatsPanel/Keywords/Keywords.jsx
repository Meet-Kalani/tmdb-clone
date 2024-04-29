import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { fetchKeywordsData } from "../../../service/api";
import style from "./keywords.module.scss";

const Keywords = ({ id, contentType, notifyError }) => {
  const [keywords, setKeywords] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setKeywords(await fetchKeywordsData(id, contentType));
      }
      catch (err) {
        notifyError(err, style.toast);
      }
    };

    fetchData();
  }, [id, notifyError, contentType]);

  const isVisible = contentType === "movie"
    ? keywords && keywords.keywords && keywords.keywords.length > 0
    : keywords && keywords.results && keywords.results.length > 0;

  return (
    isVisible && (
      <div className={style["keywords-container"]}>
        <span className={style.label}>Keywords</span>
        <div className={style["keywords-wrapper"]}>
          {contentType === "movie"
            ? keywords.keywords.map(({ id: keywordId, name }) => (
              <Link className={style.keyword} key={keywordId} to="/">
                {name}
              </Link>
            ))
            : keywords.results.map(({ id: keywordId, name }) => (
              <Link className={style.keyword} key={keywordId} to="/">
                {name}
              </Link>
            ))}
        </div>
      </div>
    )
  );
};

Keywords.propTypes = {
  id: PropTypes.number.isRequired,
  contentType: PropTypes.string.isRequired,
  notifyError: PropTypes.func.isRequired,
};

export default Keywords;
