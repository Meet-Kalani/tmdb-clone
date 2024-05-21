import PropTypes from "prop-types";
import style from "./user-review.module.scss";
import Img from "../Img/Img";
import { getRandomReview } from "../../helpers/getRandomReview";

const UserReview = ({ userReview }) => {
  const totalResults = userReview.total_results;
  const hasContent = totalResults > 0;

  const {
    imageURL, rating, author, createdAt, content: review,
  } = hasContent ? getRandomReview(userReview.results) : {};

  return (
    <div className={style["user-review"]}>
      <div className={style["review-header"]}>
        <h3 className={style["review-title"]}>Social</h3>
        <span className={style["review-count-container"]}>
          Reviews
          {" "}
          <span className={style["review-count"]}>
            {totalResults}
          </span>
        </span>
      </div>
      {hasContent ? (
        <div className={style["review-body"]}>
          <div className={style["review-author"]}>
            <Img
              alt="Content Reviewer"
              className={style["profile-image"]}
              fallbackImageURL="https://placehold.jp/16/ccc/ffffff/45x45.png?text=?"
              src={imageURL}
            />
            <div className={style["author-details"]}>
              <h3 className={style["author-name"]}>
                A review by
                {author}
              </h3>
              <div className={style["rating-details"]}>
                <div className={style["rating-container"]}>
                  <span className={style["star-icon"]} />
                  <span className={style["rating-value"]}>
                    {rating}
                    <span className={style["percentage-sign"]}>%</span>
                  </span>
                </div>
                <span className={style["review-date"]}>
                  Written by
                  {" "}
                  <span className={style["author-name"]}>{author}</span>
                  {' '}
                  on
                  {" "}
                  {createdAt}
                </span>
              </div>
            </div>
          </div>
          <div aria-label="review content" className={style["review-content"]}>{review}</div>
        </div>
      ) : <span className={style.message}>Sorry! but there is no review available at the time.</span> }
    </div>
  );
};

UserReview.propTypes = {
  userReview: PropTypes.shape({
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.shape({
      imageURL: PropTypes.string,
      rating: PropTypes.number,
      author: PropTypes.string,
      createdAt: PropTypes.string,
      content: PropTypes.string,
    })),
  }).isRequired,
};

export default UserReview;
