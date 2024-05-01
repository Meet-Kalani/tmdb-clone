import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./stats-panel.module.scss";
import Keywords from "./Keywords/Keywords";
import { NETWORKS_LOGO_BASE_URL } from "../../constants/constants";
import { formatCurrency } from "../../utils/helpers";
import SkeletonLoader from "./SkeletonLoader/SkeletonLoader";
import { fetchSocialMediaLinks } from "../../service/api";

const StatsPanel = ({
  id,
  contentType,
  isLoading,
  notifyError,
  data,
}) => {
  const [socialMediaLinks, setSocialMediaLinks] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchSocialMediaLinks(id, contentType);
        setSocialMediaLinks(res);
      }
      catch (err) {
        notifyError(err, style.toast);
      }
    })();
  }, [id, notifyError, contentType]);

  if (isLoading) {
    return <SkeletonLoader contentType={contentType} />;
  }

  const {
    budget, homepage, networks, revenue, status, type, spoken_languages: spokenLanguages,
  } = data;

  const formattedBudget = formatCurrency(budget);
  const formattedRevenue = formatCurrency(revenue);

  return (
    <div className={style["stats-panel"]}>
      <div className={style["social-media-links"]}>
        <Link className={`${style['facebook-icon']} ${style['social-media-icon']}`} to={`https://www.facebook.com/${socialMediaLinks.facebook_id}`} />
        <Link className={`${style['twitter-icon']} ${style['social-media-icon']}`} to={`https://www.twitter.com/${socialMediaLinks.twitter_id}`} />
        <Link className={`${style['instagram-icon']} ${style['social-media-icon']}`} to={`https://www.instagram.com/${socialMediaLinks.instagram_id}`} />
        <div className={style.divider} />
        <Link className={`${style['homepage-icon']} ${style['social-media-icon']}`} to={homepage} />
      </div>
      <div className={style.wrapper}>
        <span className={style.label}>Status</span>
        <span>{status}</span>
      </div>
      {contentType === "tv" ? (
        <>
          <div className={style.wrapper}>
            <span className={style.label}>Networks</span>
            <img
              alt="Network Logo"
              src={`${NETWORKS_LOGO_BASE_URL}${networks[0].logo_path}`}
              onError={(e) => {
                e.target.src = "https://placehold.jp/16/ccc/ffffff/30x30.png?text=!";
              }}
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

      <Keywords contentType={contentType} id={id} notifyError={notifyError} />
    </div>
  );
};

StatsPanel.propTypes = {
  id: PropTypes.number.isRequired,
  contentType: PropTypes.string.isRequired,
  data: PropTypes.shape({
    type: PropTypes.string,
    networks: PropTypes.arrayOf(PropTypes.shape({
      logo_path: PropTypes.string,
    })),
    status: PropTypes.string,
    budget: PropTypes.number,
    revenue: PropTypes.number,
    spoken_languages: PropTypes.arrayOf(
      PropTypes.shape({
        english_name: PropTypes.string,
        iso_639_1: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
    homepage: PropTypes.string,
  }),
  notifyError: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

StatsPanel.defaultProps = {
  data: {
    status: undefined,
    homepage: undefined,
    budget: undefined,
    revenue: undefined,
    type: undefined,
    networks: [{ logo_path: "https://placehold.jp/16/ccc/ffffff/30x30.png?text=?" }],
    spoken_languages: [{ english_name: undefined, iso_639_1: undefined, name: undefined }],
  },
};

export default StatsPanel;
