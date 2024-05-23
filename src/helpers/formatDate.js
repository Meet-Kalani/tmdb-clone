export const formatDate = (inputDate) => {
  if (inputDate) {
    const parts = inputDate.split("-");
    const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
    return formattedDate;
  }
  return null;
};

export const formatDateLong = (inputDate) => new Date(inputDate).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});
