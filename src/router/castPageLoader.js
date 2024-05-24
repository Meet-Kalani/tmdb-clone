import {
  fetchCastData,
  fetchMovieData,
  fetchTVData,
} from "../service/api";
import { notifyError } from "../helpers/notifyError";

export default ({ params }) => {
  const { contentType, id } = params;
  const fetchData = contentType === 'tv' ? fetchTVData : fetchMovieData;

  try {
    const promises = [
      fetchData(id),
      fetchCastData(id, contentType),
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
