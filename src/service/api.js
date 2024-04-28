import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { VITE_API_READ_ACCESS_TOKEN } from "../constants/envConstants";

const defaultHeaders = {
  headers: {
    Authorization: `Bearer ${VITE_API_READ_ACCESS_TOKEN}`,
  },
};

export const fetchTrendingData = async (timeWindow) => {
  const res = await axios.get(
    `${BASE_URL}/trending/movie/${timeWindow}`,
    defaultHeaders,
  );
  return res.data.results;
};

export const fetchPopularData = async (category) => {
  const res = await axios.get(
    `${BASE_URL}/${category}/popular`,
    defaultHeaders,
  );
  return res.data.results;
};

export const fetchMovieData = async (movieId) => {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}`, defaultHeaders);
  return res.data;
};

export const fetchTVData = async (movieId) => {
  const res = await axios.get(`${BASE_URL}/tv/${movieId}`, defaultHeaders);
  return res.data;
};

export const fetchWatchProviders = async (movieId, contentType) => {
  const res = await axios.get(
    `${BASE_URL}/${contentType}/${movieId}/watch/providers`,
    defaultHeaders,
  );
  return res.data.results;
};

export const fetchYoutubeVideo = async (id) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}/videos`,
    defaultHeaders,
  );
  return res.data.results[0].key;
};

export const fetchCastData = async (id, contentType) => {
  const res = await axios.get(
    `${BASE_URL}/${contentType}/${id}/credits`,
    defaultHeaders,
  );
  return res.data.cast;
};

export const fetchKeywordsData = async (id, contentType) => {
  const res = await axios.get(
    `${BASE_URL}/${contentType}/${id}/keywords`,
    defaultHeaders,
  );
  return res.data;
};

export const fetchUserReviews = async (id, contentType) => {
  const res = await axios.get(
    `${BASE_URL}/${contentType}/${id}/reviews`,
    defaultHeaders,
  );
  return res.data;
};

export const fetchRecommendations = async (id, contentType) => {
  const res = await axios.get(
    `${BASE_URL}/${contentType}/${id}/recommendations`,
    defaultHeaders,
  );
  return res.data.results;
};
