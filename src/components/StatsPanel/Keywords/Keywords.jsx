import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { fetchKeywordsData } from "../../../service/api";
import style from "./keywords.module.scss";
import { notifyError } from "../../../utils/helpers";

const Keywords = ({ id, contentType }) => {
  const [keywords, setKeywords] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchKeywordsData(id, contentType);
        setKeywords(res.keywords || res.results);
      }
      catch (err) {
        notifyError(err);
      }
    })();
  }, [id, contentType]);

  const isVisible = keywords.length > 0;

  return (
    isVisible && (
      <div className={style["keywords-container"]}>
        <span className={style.label}>Keywords</span>
        <div className={style["keywords-wrapper"]}>
          { keywords.map(({ id: keywordId, name }) => (
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
};

export default Keywords;
