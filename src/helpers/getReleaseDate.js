export const getReleaseDate = () => {
  const currentDate = new Date();
  const sixMonthsFromNow = new Date(currentDate);
  sixMonthsFromNow.setMonth(currentDate.getMonth() + 6);
  return sixMonthsFromNow.toISOString().split('T')[0];
};
