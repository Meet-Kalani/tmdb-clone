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
