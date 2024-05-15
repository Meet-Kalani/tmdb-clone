import {
  fetchCastData, fetchMovieData, fetchTVData, fetchUserReviews, fetchWatchProviders,
} from "../service/api";
import { notifyError } from "../utils/helpers";

export default async (e) => {
  const contentType = e.request.url.includes('tv') ? 'tv' : 'movie';
  const id = e.params.movieId;
  let response;
  const fetchData = contentType === 'tv' ? fetchTVData : fetchMovieData;

  try {
    const data = await fetchData(id);

    const [watchProvider, castData, userReview] = await Promise.all([
      fetchWatchProviders(id, contentType),
      fetchCastData(id, contentType),
      fetchUserReviews(id, contentType),
    ]);
    response = {
      data, watchProvider, castData, userReview,
    };
  }
  catch (error) {
    notifyError(error);
  }

  return response;
};
