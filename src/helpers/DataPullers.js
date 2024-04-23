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
