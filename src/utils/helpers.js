import { toast } from 'react-toastify';
import { AVAILABILITIES } from './availabilities';

export const notifyError = (err, className) => {
  toast.error(err.response.data.status_message, {
    toastId: err.response.data.status_code,
    autoClose: 7000,
    hideProgressBar: true,
    position: "bottom-right",
    className,
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

export const todaysDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

export const dateAfter6Month = () => {
  const date = new Date();
  const firstDate = new Date(date.setMonth(date.getMonth() + 6));
  return firstDate.toISOString().split('T')[0];
};

export const getDateBefore37Days = () => {
  const date = new Date();
  const firstDate = new Date(date.setDate(date.getDate() - 37));
  return firstDate.toISOString().split('T')[0];
};

export const getDateAfter5Days = () => {
  const date = new Date();
  const firstDate = new Date(date.setDate(date.getDate() + 5));
  return firstDate.toISOString().split('T')[0];
};

export const getDateAfterWeek = () => {
  const date = new Date();
  const afterWeek = new Date(date.setDate(date.getDate() + 7));
  return afterWeek.toISOString().split('T')[0];
};

export const getFutureDates = () => {
  const date = new Date();
  const startOfTheMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  const date1 = new Date(
    startOfTheMonth.setDate(startOfTheMonth.getDate() + 6),
  );
  const fifthDay = date1.toISOString().split('T')[0];

  const date2 = new Date(date1.setDate(date1.getDate() + 21));
  const lastDay = date2.toISOString().split('T')[0];

  return [fifthDay, lastDay];
};

export const removeDuplicates = (array) => {
  const uniqueArray = array.filter((obj, index, self) => index === self.findIndex((t) => (
    t.id === obj.id
  )));

  return uniqueArray;
};

export const buildFilterQueryURL = (
  selectedFilters,
  pageNumber,
) => {
  const {
    sort,
    OTTRegion,
    watchProviders,
    availabilities,
    genres,
    certifications,
    language,
    userScore,
    minimumUserVotes,
    runtime,
    releaseDate,
  } = selectedFilters;

  const availabilityArray = Array.from(availabilities);
  const formattedAvailability = availabilityArray.length === Object.keys(AVAILABILITIES).length ? undefined : availabilityArray.join('|');
  const genreParam = Array.from(genres).join('|');
  const formattedCertification = Array.from(certifications).join('|');
  const formattedWatchProvider = Array.from(watchProviders).join('|');

  const params = [];

  if (OTTRegion) params.push(`watch_region=${OTTRegion}`);
  if (pageNumber) params.push(`page=${pageNumber}`);
  if (formattedWatchProvider) params.push(`with_watch_providers=${formattedWatchProvider}`);
  if (sort) params.push(`sort_by=${sort}`);
  if (formattedAvailability) params.push(`with_ott_monetization_types=${formattedAvailability}`);
  if (genreParam) params.push(`with_genres=${genreParam}`);
  if (formattedCertification) params.push(`certification=${formattedCertification}`);
  if (releaseDate.gte && releaseDate.lte) params.push(`release_date.gte=${releaseDate.gte}&release_date.lte=${releaseDate.lte}`);
  if (language && language !== "xx") params.push(`with_original_language=${language}`);
  params.push(`vote_average.gte=${userScore.gte}&vote_average.lte=${userScore.lte}`);
  params.push(`vote_count.gte=${minimumUserVotes.gte}`);
  params.push(`with_runtime.gte=${runtime.gte}&with_runtime.lte=${runtime.lte}`);

  return params.join('&');
};

export const formatReleaseDateLTE = () => {
  const currentDate = new Date();
  const sixMonthsFromNow = new Date(currentDate);
  sixMonthsFromNow.setMonth(currentDate.getMonth() + 6);
  return sixMonthsFromNow.toISOString().split('T')[0];
};
