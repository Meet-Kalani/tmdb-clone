import {
  Await, useLoaderData, useParams,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Suspense, lazy, useEffect, useState,
} from "react";
import style from "./details-page.module.scss";
import PrimaryInfo from "../../components/PrimaryInfo/PrimaryInfo";
import CastInfo from "../../components/CastInfo/CastInfo";
import StatsPanel from "../../components/StatsPanel/StatsPanel";
import UserReview from "../../components/UserReview/UserReview";
import CurrentSeason from "../../components/CurrentSeason/CurrentSeason";
import { BACKDROP_BASE_URL } from "../../constants/constants";
import useTitle from "../../hooks/useTitle";
import Spinner from "../../components/Spinner/Spinner";
import ErrorPage from "../ErrorPage/ErrorPage";

const Recommendation = lazy(() => import("../../components/Recommendation/Recommendation"));

const DetailsPage = () => {
  const data = useLoaderData();
  const [documentTitleData, setDocumentTitleData] = useState({});

  const { id, contentType } = useParams();

  const backdropStyle = {
    background: `linear-gradient(to right, rgb(32, 32, 32) calc(-510px + 50vw), rgba(32, 32, 32, 0.84) 50%, rgba(32, 32, 32, 0.84) 100%), url(${encodeURI(BACKDROP_BASE_URL + data.backdrop_path)})`,
  };

  const creatorName = data?.created_by?.[0]?.name ?? undefined;
  const parsedId = parseInt(id, 10);

  useEffect(() => {
    (async () => {
      const resolvedData = await data.results;
      setDocumentTitleData({
        name: resolvedData[0].name,
        originalTitle: resolvedData[0].original_title,
        firstAIRDate: resolvedData[0].first_air_date,
        releaseDate: resolvedData[0].release_date,
      });
    })();
  }, [data]);

  const {
    name, originalTitle, firstAIRDate, releaseDate,
  } = documentTitleData;

  const documentTitle = `${name || originalTitle} (${firstAIRDate?.slice(0, 4) || releaseDate?.slice(0, 4)}) — The Movie Database (TMDB)`;
  useTitle(documentTitle);

  return (
    <>
      <ToastContainer />
      <div className={style["movie-page"]}>
        <Suspense fallback={<Spinner />}>
          <Await
            resolve={data.results}
            errorElement={
              <ErrorPage />
          }
          >
            {(results) => (
              <>
                <div className={style["primary-info"]} style={{ ...backdropStyle }}>
                  <div className={style["movie-info-wrapper"]}>
                    <PrimaryInfo
                      contentType={contentType}
                      creator={contentType === 'tv' ? creatorName : undefined}
                      data={results[0]}
                      originalTitle={contentType === 'tv' ? name : originalTitle}
                      releaseDate={contentType === 'tv' ? firstAIRDate : releaseDate}
                      watchProvider={results[1]}
                      youtubeId={results[5]}
                    />
                  </div>
                </div>
                <div className={style["secondary-info"]}>
                  <div className={style.wrapper}>
                    <CastInfo castData={results[2].cast} contentType={contentType} id={parsedId} />
                    {(contentType === 'tv')
                      ? (
                        <CurrentSeason data={results[0].seasons.at(-1)} />
                      )
                      : undefined}
                    <UserReview userReview={results[3]} />
                    <Suspense fallback={<Spinner />}>
                      <Recommendation contentType={contentType} id={parsedId} />
                    </Suspense>
                  </div>
                  <div>
                    <StatsPanel
                      contentType={contentType}
                      data={results[0]}
                      id={parsedId}
                      socialMediaLinks={results[4]}
                    />
                  </div>
                </div>
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </>
  );
};

export default DetailsPage;
