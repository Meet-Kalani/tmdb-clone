import { useEffect, useRef, useState } from "react";
import { notifyError } from "../helpers/notifyError";
import { fetchRecommendations } from "../service/api";

const useRecommendationObserver = (id, contentType) => {
  const [recommendations, setRecommendations] = useState([]);
  const recommendationRef = useRef();

  useEffect(() => {
    const recommendationRefCurrent = recommendationRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (async () => {
            try {
              const res = await fetchRecommendations(id, contentType);
              setRecommendations(res);
            }
            catch (err) {
              notifyError(err);
            }
            finally {
              observer.unobserve(recommendationRefCurrent);
            }
          })();
        }
      },
    );

    if (recommendationRefCurrent) {
      observer.observe(recommendationRefCurrent);
    }

    return () => {
      if (recommendationRefCurrent) {
        observer.unobserve(recommendationRefCurrent);
      }
      setRecommendations(null);
    };
  }, [contentType, id]);

  return { recommendationRef, recommendations };
};

export default useRecommendationObserver;
