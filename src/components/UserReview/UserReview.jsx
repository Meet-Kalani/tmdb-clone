import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./user-review.module.scss";
import { fetchUserReviews } from "../../service/api";
import { REVIEWER_PROFILE_BASE_URL } from "../../constants/constants";
import SkeletonLoader from "./SkeletonLoader/SkeletonLoader";
import { formatDateLong } from "../../helpers/formatDate";

const UserReview = ({ id, contentType, notifyError }) => {
  const [userReview, setUserReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const hasContent = userReview.total_results > 0;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchUserReviews(id, contentType);
        setUserReview(res);
      }
      catch (err) {
        notifyError(err, style.toast);
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, [id, notifyError, contentType]);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  const randomIndex = Math.floor(Math.random() * userReview.results.length);
  const imageURL = hasContent && `${REVIEWER_PROFILE_BASE_URL}${userReview.results[randomIndex].author_details.avatar_path}`;
  const rating = hasContent && userReview.results[randomIndex].author_details.rating * 10;
  const { author } = hasContent && userReview.results[randomIndex];
  const createdAt = hasContent && formatDateLong(userReview.results[randomIndex].created_at);
  const review = hasContent && userReview.results[randomIndex].content;
  const totalResults = hasContent ? userReview.total_results : undefined;

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
            <img
              alt="Content Reviewer"
              className={style["profile-image"]}
              src={imageURL || undefined}
              onError={(event) => {
                event.target.src = "https://placehold.jp/16/ccc/ffffff/45x45.png?text=?";
              }}
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
  id: PropTypes.number.isRequired,
  contentType: PropTypes.string.isRequired,
  notifyError: PropTypes.func.isRequired,
};

export default UserReview;
