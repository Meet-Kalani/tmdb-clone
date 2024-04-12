import style from "./tabs.module.scss";
import PropTypes from "prop-types";

const Tabs = ({ labels,handleTabSelection,selectedTab }) => {
  return (
    <div className={style["tabs"]}>
      {labels.map((label) => {
        return (
          <div
            key={crypto.randomUUID()}
            className={`${style["tab"]} ${selectedTab === label && style["selected-tab"]}`}
            onClick={handleTabSelection}
          >
            <a
              href="#"
              onClick={(event)=>{event.preventDefault()}}
              className={`${style["tab-title"]} ${selectedTab === label && style["selected"]}`}
            >
              {label}
            </a>
          </div>
        );
      })}
    </div>
  );
};

Tabs.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  handleTabSelection:PropTypes.func,
  selectedTab:PropTypes.string
};

export default Tabs;
