import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./user-review.module.scss";
import { fetchUserReviews } from "../../service/api";
import { REVIEWER_PROFILE_BASE_URL } from "../../constants/constants";

const formatDate = (inputDate) => new Date(inputDate).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const UserReview = ({ id, contentType, notifyError }) => {
  const [userReview, setUserReview] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUserReview(await fetchUserReviews(id, contentType));
      }
      catch (err) {
        notifyError(err, style.toast);
      }
    };
    fetchData();
  }, [id, notifyError, contentType]);

  if (Object.keys(userReview).length === 0 || userReview.total_results === 0) {
    return;
  }
  const image_url = `${REVIEWER_PROFILE_BASE_URL}${userReview.results[0].author_details.avatar_path}`;
  const rating = userReview.results[0].author_details.rating * 10;
  const { author } = userReview.results[0];
  const created_at = formatDate(userReview.results[0].created_at);
  const review = userReview.results[0].content;

  return (
    <div className={style["user-review"]}>
      <div className={style["review-header"]}>
        <h3 className={style["review-title"]}>Social</h3>
        <span className={style["review-count-container"]}>
          Reviews
          {" "}
          <span className={style["review-count"]}>
            {userReview.total_results}
          </span>
        </span>
      </div>
      <div className={style["review-body"]}>
        <div className={style["review-author"]}>
          <img
            className={style["profile-image"]}
            src={image_url || undefined}
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
                {created_at}
              </span>
            </div>
          </div>
        </div>
        <div className={style["review-content"]}>{review}</div>
      </div>
    </div>
  );
};

UserReview.propTypes = {
  id: PropTypes.number,
  contentType: PropTypes.string,
  notifyError: PropTypes.func.isRequired,
};

export default UserReview;
