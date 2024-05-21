import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroller';
import style from "./category-list.module.scss";
import CategoryCard from "./CategoryCard/CategoryCard";

const CategoryList = ({
  contentType, fetchData, data, isScrollable, toggleScrolling,
}) => (
  <div className={style.wrapper}>
    <InfiniteScroll
      className={style['category-list']}
      hasMore={isScrollable}
      loadMore={() => fetchData(false)}
    >
      {data.results.length ? data.results.map(({
        id, release_date: releaseDate, first_air_date: firstAIRDate, original_name: originalName, original_title: originalTitle, poster_path: posterPath, vote_average: voteAverage,
      }) => (
        <CategoryCard
          contentType={contentType}
          id={id}
          key={id}
          name={originalName || originalTitle}
          posterPath={posterPath}
          releaseDate={releaseDate || firstAIRDate}
          voteAverage={Math.floor(voteAverage * 10)}
        />
      )) : <span>No items were found that match your query.</span>}
    </InfiniteScroll>
    {
        data.results.length ? (
          <button
            className={style['load-btn']}
            type="button"
            onClick={toggleScrolling}
          >
            Load More
          </button>
        ) : null
      }
  </div>
);

CategoryList.propTypes = {
  contentType: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  data: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      original_name: PropTypes.string,
      original_title: PropTypes.string,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      first_air_date: PropTypes.string,
      vote_average: PropTypes.number,
    })),
  }),
  isScrollable: PropTypes.bool.isRequired,
  toggleScrolling: PropTypes.func.isRequired,
};

CategoryList.defaultProps = {
  data: {
    results: {
      id: undefined,
      original_name: undefined,
      original_title: undefined,
      poster_path: undefined,
      release_date: undefined,
      first_air_date: undefined,
      vote_average: undefined,
    },
  },
};

export default CategoryList;
