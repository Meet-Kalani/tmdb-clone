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
