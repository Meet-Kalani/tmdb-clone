import PropTypes from "prop-types";
import Card from "../Card/Card";
import Tabs from "../Tabs/Tabs";
import style from "./cardlist.module.scss";

const CardList = ({
  tabs,
  data,
  handleTabSelection,
  selectedTab,
  label,
}) => {
  return (
    <section className={style["cardlist"]}>
      <div className={style["cardlist-header"]}>
        <h2 className={style["cardlist-title"]}>{label}</h2>
        <Tabs
          labels={tabs}
          selectedTab={selectedTab}
          handleTabSelection={handleTabSelection}
        />
      </div>
      <div className={style["cardlist-content"]}>
        {data.map(
          ({
            id,
            original_title,
            name,
            first_air_date,
            release_date,
            poster_path,
            vote_average,
          }) => {
            return (
              <Card
                key={id}
                id={id}
                original_title={original_title || name}
                release_date={release_date || first_air_date}
                poster_path={poster_path}
                vote_average={vote_average}
              />
            );
          }
        )}
      </div>
    </section>
  );
};

CardList.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      original_title: PropTypes.string,
      release_date: PropTypes.string,
      poster_path: PropTypes.string,
      vote_average: PropTypes.number,
    })
  ),
  handleTabSelection: PropTypes.func,
  selectedTab: PropTypes.string,
  label: PropTypes.string,
};

export default CardList;
