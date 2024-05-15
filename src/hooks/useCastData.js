import { useEffect, useState } from 'react';
import { notifyError } from '../utils/helpers';

const useCastData = (id, contentType, fetchCastData) => {
  const [castData, setCastData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCastData(id, contentType);
        setCastData(res.slice(0, 9));
      }
      catch (err) {
        notifyError(err);
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, [id, contentType, fetchCastData]);

  return { castData, isLoading };
};

export default useCastData;
