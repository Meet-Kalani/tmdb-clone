import PropTypes from "prop-types";
import Card from "./Card/Card";
import Tabs from "./Tabs/Tabs";
import SkeletonLoader from "./SkeletonLoader/SkeletonLoader";
import style from "./card-list.module.scss";

const CardList = ({
  tabs,
  data,
  handleTabSelection,
  selectedTab,
  label,
  isLoading,
}) => (
  <section className={style.cardlist}>
    <div className={style["cardlist-header"]}>
      <h2 className={style["cardlist-title"]}>{label}</h2>
      <Tabs
        handleTabSelection={handleTabSelection}
        labels={tabs}
        selectedTab={selectedTab}
      />
    </div>
    <div className={style["cardlist-content"]}>
      {isLoading ? (
        <div className={style["skeleton-wrapper"]}>
          {[...Array(20)].map(() => <SkeletonLoader key={crypto.randomUUID()} />)}
        </div>
      ) : (
        data.map(
          ({
            id,
            original_title: originalTitle,
            name,
            first_air_date: firstAIRDate,
            release_date: releaseDate,
            poster_path: posterPath,
            vote_average: voteAverage,
          }) => (
            <Card
              id={id}
              key={id}
              original_title={originalTitle || name}
              poster_path={posterPath}
              release_date={firstAIRDate || releaseDate}
              selectedTab={selectedTab}
              vote_average={voteAverage}
            />
          ),
        )
      )}
    </div>
  </section>
);

CardList.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      original_title: PropTypes.string,
      release_date: PropTypes.string,
      poster_path: PropTypes.string,
      vote_average: PropTypes.number,
    }),
  ).isRequired,
  handleTabSelection: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CardList;
