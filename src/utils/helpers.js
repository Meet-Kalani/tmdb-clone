import { toast } from 'react-toastify';

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
  OTTRegion,
  pageNumber,
  watchProviders,
  sort,
  availability,
  genreParam,
  certification,
  language,
  userScore,
  minimumUserVotes,
  runtime,
) => {
  const params = [];

  if (OTTRegion) params.push(`watch_region=${OTTRegion}`);
  if (pageNumber) params.push(`page=${pageNumber}`);
  if (watchProviders) params.push(`with_watch_providers=${watchProviders}`);
  if (sort) params.push(`sort_by=${sort}`);
  if (availability) params.push(`with_watch_monetization_types=${availability}`);
  if (genreParam) params.push(`with_genres=${genreParam}`);
  if (certification) params.push(`certification=${certification}`);
  if (language && language !== "xx") params.push(`with_original_language=${language}`);
  params.push(`vote_average.gte=${userScore.gte}&vote_average.lte=${userScore.lte}`);
  params.push(`vote_count.gte=${minimumUserVotes.gte}`);
  params.push(`with_runtime.gte=${runtime.gte}&with_runtime.lte=${runtime.lte}`);

  return params.join('&');
};
