// hooks/useCastData.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { notifyError } from "../helpers/notifyError";

const useFetchData = (fetcherFunction) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id, contentType } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetcherFunction(id, contentType);
        setData(res);
      }
      catch (err) {
        notifyError(err);
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, [contentType, id, fetcherFunction]);

  return { data, isLoading };
};

export default useFetchData;
