import style from "./user-review.module.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUserReviews } from "../../helpers/DataPullers";
import { REVIEWER_PROFILE_BASE_URL } from "../../constants/constants";
import { formatDate } from "../../helpers/Formatters";
import PropTypes from "prop-types";

const UserReview = ({ id }) => {
  const [userReview, setUserReview] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setUserReview(await fetchUserReviews(id));
      } catch (err) {
        console.error(err);
        navigate("/not-found");
      }
    };
    fetchData();
  }, [id, navigate]);
  const image_url =
    Object.keys(userReview).length > 0 &&
    `${REVIEWER_PROFILE_BASE_URL}${userReview.results[0].author_details.avatar_path}`;
  const rating =
    Object.keys(userReview).length > 0 &&
    userReview.results[0].author_details.rating * 10;
  const author =
    Object.keys(userReview).length > 0 && userReview.results[0].author;
  const created_at =
    Object.keys(userReview).length > 0 &&
    formatDate(userReview.results[0].created_at);
  const review =
    Object.keys(userReview).length > 0 && userReview.results[0].content;

  return (
    <div className={style["user-review"]}>
      <div className={style["review-header"]}>
        <h3 className={style["review-title"]}>Social</h3>
        <span className={style["review-count-container"]}>
          Reviews{" "}
          <span className={style["review-count"]}>
            {userReview.total_results}
          </span>
        </span>
      </div>
      <div className={style["review-body"]}>
        <div className={style["review-author"]}>
          <img src={image_url} className={style["profile-image"]} />
          <div className={style["author-details"]}>
            <h3 className={style["author-name"]}>A review by {author}</h3>
            <div className={style["rating-details"]}>
              <div className={style["rating-container"]}>
                <span className={style["star-icon"]}></span>
                <span className={style["rating-value"]}>
                  {rating}
                  <span className={style["percentage-sign"]}>%</span>
                </span>
              </div>
              <span className={style["review-date"]}>
                Written by{" "}
                <span className={style["author-name"]}>{author}</span> on{" "}
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
};

export default UserReview;
