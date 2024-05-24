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
  const [resolvedData, setResolvedData] = useState({});
  const { id, contentType } = useParams();
  const parsedId = parseInt(id, 10);

  useEffect(() => {
    (async () => {
      const resolved = await data.results;
      setResolvedData({
        name: resolved[0].name,
        originalTitle: resolved[0].original_title,
        firstAIRDate: resolved[0].first_air_date,
        releaseDate: resolved[0].release_date,
        backdropPath: resolved[0].backdrop_path,
      });
    })();
  }, [data]);

  const {
    name, originalTitle, firstAIRDate, releaseDate, backdropPath,
  } = resolvedData;

  const backdropStyle = {
    backgroundImage: `url(${encodeURI(BACKDROP_BASE_URL + backdropPath)})`,
  };

  const documentTitle = `${name || originalTitle} (${firstAIRDate?.slice(0, 4) || releaseDate?.slice(0, 4)}) — The Movie Database (TMDB)`;
  useTitle(documentTitle);

  return (
    <>
      <ToastContainer />
      <div className={style["movie-page"]}>
        <Suspense fallback={<Spinner />}>
          <Await
            errorElement={<ErrorPage />}
            resolve={data.results}
          >
            {([primaryInfo, watchProvider, castData, userReview, socialMediaLinks, youtubeId]) => (
              <>
                <div className={style["primary-info"]} style={{ ...backdropStyle }}>
                  <div className={style.wrapper}>
                    <div className={style["movie-info-wrapper"]}>
                      <PrimaryInfo
                        contentType={contentType}
                        creator={contentType === 'tv' ? primaryInfo.created_by[0].name : undefined}
                        data={primaryInfo}
                        originalTitle={contentType === 'tv' ? primaryInfo.name : primaryInfo.original_title}
                        releaseDate={contentType === 'tv' ? primaryInfo.first_air_date : primaryInfo.release_date}
                        watchProvider={watchProvider}
                        youtubeId={youtubeId}
                      />
                    </div>
                  </div>
                </div>
                <div className={style["secondary-info"]}>
                  <div className={style.wrapper}>
                    <CastInfo castData={castData.cast} contentType={contentType} id={parsedId} />
                    {contentType === 'tv' ? (
                      <CurrentSeason data={primaryInfo.seasons.at(-1)} />
                    ) : undefined}
                    <UserReview userReview={userReview} />
                    <Suspense fallback={<Spinner />}>
                      <Recommendation contentType={contentType} id={parsedId} />
                    </Suspense>
                  </div>
                  <div>
                    <StatsPanel
                      contentType={contentType}
                      data={primaryInfo}
                      id={parsedId}
                      socialMediaLinks={socialMediaLinks}
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
