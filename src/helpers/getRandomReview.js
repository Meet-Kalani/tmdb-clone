import { REVIEWER_PROFILE_BASE_URL } from "../constants/constants";
import formatDateLong from "./formatDate";

export const getRandomReview = (reviews) => {
  const randomIndex = Math.floor(Math.random() * reviews.length);
  const review = reviews[randomIndex];
  const avatarPath = review.author_details.avatar_path;
  const imageURL = avatarPath ? `${REVIEWER_PROFILE_BASE_URL}${avatarPath}` : 'https://placehold.jp/16/ccc/ffffff/45x45.png?text=?';
  const rating = review.author_details.rating * 10;
  const { author } = review;
  const createdAt = formatDateLong(review.created_at);
  const { content } = review;

  return {
    imageURL, rating, author, createdAt, content,
  };
};
