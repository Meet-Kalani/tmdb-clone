import { toast } from 'react-toastify';

export const notifyError = (err) => {
  toast.error(err.response.data.status_message, {
    toastId: err.response.data.status_code,
    autoClose: 7000,
    hideProgressBar: true,
    position: "bottom-right",
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

export const formatDateLong = (inputDate) => new Date(inputDate).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export const hasTruthyValue = (obj) => Object.values(obj).some((value) => value);
