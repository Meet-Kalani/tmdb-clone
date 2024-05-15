import { useLoaderData } from "react-router-dom";
import style from "./user-review.module.scss";
import { REVIEWER_PROFILE_BASE_URL } from "../../constants/constants";
import { formatDateLong } from "../../utils/helpers";
import Img from "../Img/Img";

const UserReview = () => {
  const { userReview } = useLoaderData();

  const hasContent = userReview.total_results > 0;

  const randomIndex = Math.floor(Math.random() * userReview.results.length);
  const avatarPath = hasContent && userReview.results[randomIndex].author_details.avatar_path;
  const imageURL = avatarPath ? `${REVIEWER_PROFILE_BASE_URL}${avatarPath}` : 'https://placehold.jp/16/ccc/ffffff/45x45.png?text=?';
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

export default UserReview;
