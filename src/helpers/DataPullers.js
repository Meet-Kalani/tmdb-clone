import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { VITE_API_READ_ACCESS_TOKEN } from "../constants/envConstants";

const defaultHeaders = {
  headers: {
    Authorization: `Bearer ${VITE_API_READ_ACCESS_TOKEN}`,
  },
};

export const fetchTrendingData = async (time_window) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/trending/movie/${time_window}`,
      defaultHeaders,
    );
    return res.data.results;
  } catch (error) {
    console.error("Error fetching trending data:", error);
    throw error;
  }
};

export const fetchPopularData = async (category) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/${category}/popular`,
      defaultHeaders,
    );
    return res.data.results;
  } catch (error) {
    console.error("Error fetching popular data:", error);
    throw error;
  }
};

export const fetchMovieData = async (movieId) => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${movieId}`, defaultHeaders);
    return res.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};

export const fetchWatchProviders = async (movieId) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/movie/${movieId}/watch/providers`,
      defaultHeaders,
    );
    return res.data.results.US;
  } catch (error) {
    console.error("Error fetching watch providers data:", error);
    throw error;
  }
};

export const fetchYoutubeVideo = async (id) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/movie/${id}/videos`,
      defaultHeaders,
    );
    return res.data.results[0].key;
  } catch (error) {
    console.error("Error fetching watch providers data:", error);
    throw error;
  }
};
