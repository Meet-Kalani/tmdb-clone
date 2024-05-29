import { AVAILABILITIES } from "../constants/availabilities";
import { RELEASE_TYPES } from "../constants/releaseTypes";

export const buildFilterQueryURL = (
  selectedFilters,
  pageNumber,
) => {
  const {
    sort,
    OTTRegion,
    watchProviders,
    availabilities,
    releaseTypes,
    genres,
    releaseRegion,
    certifications,
    language,
    userScore,
    minimumUserVotes,
    runtime,
    releaseDate,
    airDate,
    firstAirDate,
  } = selectedFilters;

  const availabilityArray = Array.from(availabilities);
  const formattedAvailability = availabilityArray.length === Object.keys(AVAILABILITIES).length ? undefined : availabilityArray.join('|');
  const releaseTypesArray = Array.from(releaseTypes);
  const formattedReleaseTypes = releaseTypesArray.join('|');
  const genreParam = Array.from(genres).join('|');
  const formattedCertification = Array.from(certifications).join('|');
  const formattedWatchProvider = Array.from(watchProviders).join('|');

  const params = [];
  const releaseTypesCount = Object.keys(RELEASE_TYPES).length;

  if (OTTRegion) params.push(`watch_region=${OTTRegion.id}`);
  if (pageNumber) params.push(`page=${pageNumber}`);
  if (formattedWatchProvider) params.push(`with_watch_providers=${formattedWatchProvider}`);
  if (sort) params.push(`sort_by=${sort.value}`);
  if (formattedAvailability) params.push(`with_ott_monetization_types=${formattedAvailability}`);
  if (genreParam) params.push(`with_genres=${genreParam}`);
  if (formattedCertification) params.push(`certification=${formattedCertification}`);
  if (releaseRegion) params.push(`region=${releaseRegion.id}`);
  if (formattedReleaseTypes && releaseTypesArray.length !== releaseTypesCount) params.push(`with_release_type=${formattedReleaseTypes}`);
  if (releaseDate.lte) params.push(`release_date.lte=${releaseDate.lte}`);
  if (releaseDate.gte) params.push(`release_date.gte=${releaseDate.gte}`);
  if (airDate.lte) params.push(`air_date.lte=${airDate.lte}`);
  if (airDate.gte) params.push(`air_date.gte=${airDate.gte}`);
  if (firstAirDate.lte) params.push(`first_air_date.lte=${firstAirDate.lte}`);
  if (firstAirDate.gte) params.push(`first_air_date.gte=${firstAirDate.gte}`);
  if (language && language !== "xx") params.push(`with_original_language=${language}`);
  params.push(`vote_average.gte=${userScore.gte}&vote_average.lte=${userScore.lte}`);
  params.push(`vote_count.gte=${minimumUserVotes.gte}`);
  params.push(`with_runtime.gte=${runtime.gte}&with_runtime.lte=${runtime.lte}`);

  return params.join('&');
};
