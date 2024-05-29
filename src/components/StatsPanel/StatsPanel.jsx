import PropTypes from "prop-types";
import style from "./stats-panel.module.scss";
import Keywords from "./Keywords/Keywords";
import { NETWORKS_LOGO_BASE_URL } from "../../constants/constants";
import { formatCurrency } from "../../helpers/formatCurrency";
import SocialMediaLinks from "./SocialMediaLinks/SocialMediaLinks";
import Img from "../Img/Img";

const StatsPanel = ({
  id,
  contentType,
  data,
  socialMediaLinks,
}) => {
  const {
    budget, homepage, networks, revenue, status, type, spoken_languages: spokenLanguages,
  } = data;

  const formattedBudget = formatCurrency(budget);
  const formattedRevenue = formatCurrency(revenue);

  return (
    <div className={style["stats-panel"]}>
      <SocialMediaLinks homepageLink={homepage} socialMediaLinks={socialMediaLinks} />
      <div className={style.wrapper}>
        <span className={style.label}>Status</span>
        <span>{status}</span>
      </div>
      {contentType === "tv" ? (
        <>
          <div className={style.wrapper}>
            <span className={style.label}>Networks</span>
            <Img
              alt="Network Logo"
              src={`${NETWORKS_LOGO_BASE_URL}${networks[0].logo_path}`}
            />
          </div>
          <div className={style.wrapper}>
            <span className={style.label}>Type</span>
            <span>{type}</span>
          </div>
        </>
      ) : undefined}
      <div className={style.wrapper}>
        <span className={style.label}>Original Language</span>
        <span>{spokenLanguages[0]?.english_name}</span>
      </div>
      {contentType === "movie" ? (
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
      ) : undefined}

      <Keywords contentType={contentType} id={id} />
    </div>
  );
};

StatsPanel.propTypes = {
  id: PropTypes.number.isRequired,
  contentType: PropTypes.string.isRequired,
  socialMediaLinks: PropTypes.shape({
    facebook_id: PropTypes.string,
    instagram_id: PropTypes.string,
    twitter_id: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    budget: PropTypes.number,
    homepage: PropTypes.string,
    networks: PropTypes.arrayOf(PropTypes.shape({
      logo_path: PropTypes.string,
    })),
    revenue: PropTypes.number,
    status: PropTypes.string,
    type: PropTypes.string,
    spoken_languages: PropTypes.arrayOf(PropTypes.shape({
      english_name: PropTypes.string,
    })),
  }).isRequired,
};

export default StatsPanel;
