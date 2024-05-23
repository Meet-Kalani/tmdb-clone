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
