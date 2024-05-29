import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import style from "./watch-element.module.scss";
import { WATCH_PROVIDER_LOGO_BASE_URL } from "../../../../../constants/constants";
import SelectedFilterContext from '../../../../../pages/CategoriesPage/context';

const WatchElement = ({ watchProvider }) => {
  const [isCheckVisible, setIsCheckVisible] = useState(false);

  const { watchProvidersList, toggleWatchProviders } = useContext(SelectedFilterContext);
  const { provider_name: providerName, logo_path: logoPath, provider_id: id } = watchProvider;

  const toggleWatchProvider = () => {
    setIsCheckVisible((previousValue) => !previousValue);

    toggleWatchProviders(id);
  };

  useEffect(() => {
    setIsCheckVisible(false);
  }, [watchProvidersList]);

  return (
    <li className={style['watch-element']}>
      <img alt={providerName} className={style['watch-provider-logo']} src={`${WATCH_PROVIDER_LOGO_BASE_URL}${logoPath}`} />
      <span className={style.tooltip}>{providerName}</span>
      <div
        className={`${style['check-icon-container']} ${isCheckVisible && style['check-visible']}`}
        role="button"
        tabIndex={0}
        onClick={toggleWatchProvider}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            toggleWatchProvider();
          }
        }}
      >
        <img
          alt="check icon"
          className={style['check-icon']}
          src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-739-check-white-a09b2a26e235b77489dfd57be3b66a17ff86efd5fb94d6db5f10cd3ced01e5a6.svg"
        />
      </div>
    </li>
  );
};

WatchElement.propTypes = {
  watchProvider: PropTypes.shape({
    provider_name: PropTypes.string,
    logo_path: PropTypes.string,
    provider_id: PropTypes.number,
  }).isRequired,
};

export default WatchElement;
