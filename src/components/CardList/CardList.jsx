import PropTypes from "prop-types";
import Card from "../Card/Card";
import Tabs from "../Tabs/Tabs";
import style from "./cardlist.module.scss";

const CardList = ({ tabs, movies, handleTabSelection, selectedTab }) => {
  return (
    <section className={style["cardlist"]}>
      <div className={style["cardlist-header"]}>
        <h2 className={style["cardlist-title"]}>Free To Watch</h2>
        <Tabs labels={tabs} selectedTab={selectedTab} handleTabSelection={handleTabSelection} />
      </div>
      <div className={style["cardlist-content"]}>
        {movies.map(
          ({ id, original_title, release_date, poster_path, vote_average }) => {
            return (
              <Card
                key={id}
                original_title={original_title}
                release_date={release_date}
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
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      original_title: PropTypes.string,
      release_date: PropTypes.string,
      poster_path: PropTypes.string,
      vote_average: PropTypes.number,
    })
  ),
  handleTabSelection: PropTypes.func,
  selectedTab: PropTypes.string
};

export default CardList;
