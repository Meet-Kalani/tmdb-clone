export const formatDate = (inputDate) =>
  new Date(inputDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
