import PropTypes from "prop-types";
import style from "./tabs.module.scss";

const Tabs = ({ labels, handleTabSelection, selectedTab }) => (
  <div className={style.tabs}>
    {labels.map((label) => (
      <div
        className={`${style.tab} ${selectedTab === label && style["selected-tab"]}`}
        key={crypto.randomUUID()}
        role="button"
        tabIndex={0}
        onClick={handleTabSelection}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleTabSelection();
          }
        }}
      >
        <button
          className={`${style["tab-title"]} ${selectedTab === label && style.selected}`}
          type="button"
        >
          {label}
        </button>
      </div>
    ))}
  </div>
);

Tabs.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleTabSelection: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
};

export default Tabs;
