import { toast } from 'react-toastify';
import { REVIEWER_PROFILE_BASE_URL } from '../constants/constants';

export const notifyError = (err) => {
  toast.error(err.response.data.status_message, {
    toastId: err.response.data.status_code,
    autoClose: 7000,
    hideProgressBar: true,
    position: "bottom-right",
  });
};

export const formatCurrency = (number) => (
  `$${Number(number).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
);

export const formatDate = (inputDate) => {
  if (inputDate) {
    const parts = inputDate.split("-");
    const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
    return formattedDate;
  }
  return null;
};

export const formatDateLong = (inputDate) => new Date(inputDate).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export const hasTruthyValue = (obj) => Object.values(obj).some((value) => value);

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

export const formatMovieDetails = (watchProvider, releaseDate, runTime, voteAverage) => {
  const logoPath = watchProvider?.IN?.flatrate
    || watchProvider?.IN?.buy
    || watchProvider?.IN?.ads
    || watchProvider?.IN?.free
    || undefined;

  const watchProviderSlug = logoPath?.[0]?.logo_path;

  const [year, month, day] = releaseDate.split("-");
  const formattedReleaseDate = `${month}/${day}/${year}`;

  const formattedRuntime = `${Math.floor(runTime / 60)}h ${runTime % 60}m`;

  const rating = Math.floor(voteAverage * 10);

  const releaseYear = releaseDate.slice(0, 4);

  return {
    watchProviderSlug,
    formattedReleaseDate,
    formattedRuntime,
    rating,
    releaseYear,
  };
};
