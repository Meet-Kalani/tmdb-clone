import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroller';
import style from "./category-list.module.scss";
import { fetchCategoriesContent } from "../../service/api";
import { notifyError } from "../../utils/helpers";
import CategoryCard from "./CategoryCard/CategoryCard";

const CategoryList = ({ contentType, category }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCategoriesContent(category, contentType, 1);
        setData(res);
      }
      catch (err) {
        notifyError(err);
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, [category, contentType]);

  const fetchData = async () => {
    try {
      const res = await fetchCategoriesContent(category, contentType, pageNumber);
      setData((previousValue) => {
        // removing duplicates from api response
        const results = [...previousValue.results, ...res.results].filter((obj, index, self) => index === self.findIndex((t) => (
          t.id === obj.id
        )));

        return {
          page: res.page,
          results,
          total_pages: res.total_pages,
          total_results: res.total_results,
        };
      });
    }
    catch (err) {
      notifyError(err);
    }
    finally {
      setPageNumber((previousValue) => previousValue + 1);
    }
  };

  if (isLoading) {
    return (<span>Loading...</span>);
  }

  return (
    <div className={style.wrapper}>
      <InfiniteScroll
        className={style['category-list']}
        hasMore={hasMore}
        loadMore={fetchData}
      >
        {data ? data.results.map(({
          id, release_date: releaseDate, first_air_date: firstAIRDate, original_name: originalName, original_title: originalTitle, poster_path: posterPath, vote_average: voteAverage,
        }) => (
          <CategoryCard
            contentType={contentType}
            id={id}
            isLoading={isLoading}
            key={id}
            name={originalName || originalTitle}
            posterPath={posterPath}
            releaseDate={releaseDate || firstAIRDate}
            voteAverage={Math.floor(voteAverage * 10)}
            ss
          />
        )) : null}
      </InfiniteScroll>
      <button
        className={style['load-btn']}
        type="button"
        onClick={() => {
          setHasMore(true);
        }}
      >
        Load More
      </button>
    </div>
  );
};

CategoryList.propTypes = {
  contentType: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default CategoryList;
