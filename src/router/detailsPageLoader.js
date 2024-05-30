import {
  fetchCastData,
  fetchMovieData,
  fetchSocialMediaLinks,
  fetchTVData,
  fetchUserReviews,
  fetchWatchProviders,
  fetchYoutubeVideo,
} from "../service/api";
import { notifyError } from "../helpers/notifyError";

export default ({ params }) => {
  const { contentType, id } = params;
  const fetchData = contentType === 'tv' ? fetchTVData : fetchMovieData;

  try {
    const promises = [
      fetchData(id),
      fetchWatchProviders(id, contentType),
      fetchCastData(id, contentType),
      fetchUserReviews(id, contentType),
      fetchSocialMediaLinks(id, contentType),
      fetchYoutubeVideo(id, contentType),
    ];

    return {
      results: Promise.all(promises),
    };
  }
  catch (error) {
    notifyError(error);
    throw error;
  }
};
