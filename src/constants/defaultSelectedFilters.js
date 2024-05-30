import { getReleaseDate } from "../helpers/getReleaseDate";
import { AVAILABILITIES } from "./availabilities";
import { RELEASE_TYPES } from "./releaseTypes";

export const DEFAULT_SELECTED_FILTERS = {
  sort: {
    value: 'popularity.desc',
    label: 'Popularity Descending',
  },
  OTTRegion: {
    id: "IN",
    country: "India",
    imageId: "IN",
  },
  watchProviders: new Set(),
  availabilities: new Set(AVAILABILITIES.map(({ label }) => label)),
  genres: new Set(),
  certifications: new Set(),
  releaseRegion: {
    id: 'IN',
    country: 'India',
    imageId: 'IN',
  },
  language: {
    id: "xx",
    englishName: "None Selected",
  },
  releaseTypes: new Set(RELEASE_TYPES.map(({ id }) => id)),
  releaseDate: {
    gte: undefined,
    lte: getReleaseDate(),
  },
  airDate: {
    gte: undefined,
    lte: getReleaseDate(),
  },
  firstAirDate: {
    gte: undefined,
    lte: getReleaseDate(),
  },
  userScore: {
    gte: 0,
    lte: 10,
  },
  minimumUserVotes: {
    gte: 0,
  },
  runtime: {
    gte: 0,
    lte: 400,
  },
};
