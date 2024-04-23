import PropTypes from "prop-types";
import MovieCard from "../MovieCard/MovieCard";
import Tabs from "../Tabs/Tabs";
import style from "./movie-card-list.module.scss";

const MovieCardList = ({ tabs, data, handleTabSelection, selectedTab, label, isLoading }) => {
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
        {
          isLoading ? <div className={style['skeleton-wrapper']}>
            {[...Array(20)].map((_, index) => {
              return <SkeletonLoader key={index} />
            })}
          </div> : data.map(
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
                <MovieCard
                  key={id}
                  id={id}
                  original_title={original_title || name}
                  release_date={release_date || first_air_date}
                  poster_path={poster_path}
                  vote_average={vote_average}
                />
              );
            }
          )

        }
      </div>
    </section>
  );
};

const SkeletonLoader = () => {
  return (
    <div className={style['skeleton-loader']}>
      <div className={style['image-loader']}>
        Loading...
      </div>
      <div className={style['rating-loader-container']}>
        <span className={style['rating-loader']}>NR</span>
      </div>
    </div>
  )
}

MovieCardList.propTypes = {
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
  isLoading: PropTypes.bool
};

export default MovieCardList;
