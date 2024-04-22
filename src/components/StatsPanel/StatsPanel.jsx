import { useEffect, useState } from "react";
import style from "./stats-panel.module.scss";
import PropTypes from "prop-types";
import { fetchKeywordsData } from "../../helpers/DataPullers";
import { Link, useNavigate } from "react-router-dom";

function formatCurrency(number) {
  return (
    "$" +
    Number(number).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}
const StatsPanel = ({ id, status, languages, budget, revenue }) => {
  const formattedBudget = formatCurrency(budget);
  const formattedRevenue = formatCurrency(revenue);

  return (
    <div className={style["stats-panel"]}>
      <div className={style["wrapper"]}>
        <span className={style["label"]}>Status</span>
        <span>{status}</span>
      </div>
      <div className={style["wrapper"]}>
        <span className={style["label"]}>Original Language</span>
        <span>{languages[0].english_name}</span>
      </div>
      <div className={style["wrapper"]}>
        <span className={style["label"]}>Budget</span>
        <span>{formattedBudget}</span>
      </div>
      <div className={style["wrapper"]}>
        <span className={style["label"]}>Revenue</span>
        <span>{formattedRevenue}</span>
      </div>
      <div className={style["keywords-container"]}>
        <span className={style["label"]}>Keywords</span>
        <Keywords id={id} />
      </div>
    </div>
  );
};

const Keywords = ({ id }) => {
  const [keywords, setKeywords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setKeywords(await fetchKeywordsData(id));
      } catch (err) {
        console.error(err);
        navigate("/not-found");
      }
    };

    fetchData();
  }, [id, navigate]);

  return (
    <div className={style["keywords-wrapper"]}>
      {keywords.map(({ id, name }) => {
        return (
          <Link key={id} to="/" className={style["keyword"]}>
            {name}
          </Link>
        );
      })}
    </div>
  );
};

Keywords.propTypes = {
  id: PropTypes.number,
};

StatsPanel.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  budget: PropTypes.number,
  revenue: PropTypes.number,
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      english_name: PropTypes.string,
      iso_639_1: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

export default StatsPanel;
