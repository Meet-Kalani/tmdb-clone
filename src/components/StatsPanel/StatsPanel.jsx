import PropTypes from "prop-types";
import style from "./stats-panel.module.scss";
import Keywords from "./Keywords/Keywords";
import { NETWORKS_LOGO_BASE_URL } from "../../constants/constants";

function formatCurrency(number) {
  return (
    `$${
      Number(number).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
  );
}
const StatsPanel = ({
  id,
  status,
  spokenLanguages,
  budget,
  type,
  networks,
  revenue,
  contentType,
  notifyError,
}) => {
  const formattedBudget = formatCurrency(budget);
  const formattedRevenue = formatCurrency(revenue);

  return (
    <div className={style["stats-panel"]}>
      <div className={style.wrapper}>
        <span className={style.label}>Status</span>
        <span>{status}</span>
      </div>
      {contentType === "tv" && (
        <>
          <div className={style.wrapper}>
            <span className={style.label}>Networks</span>
            <img alt="Network Logo" src={`${NETWORKS_LOGO_BASE_URL}${networks[0].logo_path}`} />
          </div>
          <div className={style.wrapper}>
            <span className={style.label}>Type</span>
            <span>{type}</span>
          </div>
        </>
      )}
      <div className={style.wrapper}>
        <span className={style.label}>Original Language</span>
        <span>{spokenLanguages[0]?.english_name}</span>
      </div>
      {contentType === "movie" && (
        <>
          <div className={style.wrapper}>
            <span className={style.label}>Budget</span>
            <span>{formattedBudget}</span>
          </div>
          <div className={style.wrapper}>
            <span className={style.label}>Revenue</span>
            <span>{formattedRevenue}</span>
          </div>
        </>
      )}

      <Keywords contentType={contentType} id={id} notifyError={notifyError} />
    </div>
  );
};

StatsPanel.propTypes = {
  id: PropTypes.number.isRequired,
  contentType: PropTypes.string.isRequired,
  type: PropTypes.string,
  networks: PropTypes.arrayOf(PropTypes.shape({
    logo_path: PropTypes.string,
  })),
  status: PropTypes.string.isRequired,
  budget: PropTypes.number,
  revenue: PropTypes.number,
  spokenLanguages: PropTypes.arrayOf(
    PropTypes.shape({
      english_name: PropTypes.string,
      iso_639_1: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  notifyError: PropTypes.func.isRequired,
};

StatsPanel.defaultProps = {
  budget: undefined,
  revenue: undefined,
  type: undefined,
  networks: [{ logo_path: "https://placehold.jp/16/ccc/ffffff/30x30.png?text=?" }],
  spokenLanguages: [{ english_name: undefined, iso_639_1: undefined, name: undefined }],
};

export default StatsPanel;
