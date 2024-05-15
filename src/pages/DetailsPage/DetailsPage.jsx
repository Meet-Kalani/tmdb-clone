import {
  useLoaderData, useLocation, useNavigation, useParams,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense, lazy } from "react";
import style from "./details-page.module.scss";
import PrimaryInfo from "../../components/PrimaryInfo/PrimaryInfo";
import CastInfo from "../../components/CastInfo/CastInfo";
import StatsPanel from "../../components/StatsPanel/StatsPanel";
import UserReview from "../../components/UserReview/UserReview";
import CurrentSeason from "../../components/CurrentSeason/CurrentSeason";
import { BACKDROP_BASE_URL } from "../../constants/constants";
import useTitle from "../../hooks/useTitle";
import Spinner from "../../components/Spinner/Spinner";

const Recommendation = lazy(() => import("../../components/Recommendation/Recommendation"));

const DetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigation = useNavigation();
  const contentType = location.pathname.includes('tv') ? 'tv' : 'movie';

  const { data } = useLoaderData();

  const backdropStyle = {
    background: `linear-gradient(to right, rgb(32, 32, 32) calc(-510px + 50vw), rgba(32, 32, 32, 0.84) 50%, rgba(32, 32, 32, 0.84) 100%), url(${encodeURI(BACKDROP_BASE_URL + data.backdrop_path)})`,
  };

  const documentTitle = `${data.name || data.original_title} (${data?.first_air_date?.slice(0, 4) || data?.release_date?.slice(0, 4)}) — The Movie Database (TMDB)`;
  useTitle(documentTitle);

  const creatorName = data?.created_by?.[0]?.name ?? undefined;
  const parsedMovieId = parseInt(movieId, 10);

  if (navigation.state === "loading") {
    return <Spinner />;
  }

  return (
    <>
      <ToastContainer />
      <div className={style["movie-page"]}>
        <div className={style["primary-info"]} style={backdropStyle}>
          <div className={style["movie-info-wrapper"]}>
            {contentType === 'tv' ? (
              <PrimaryInfo
                contentType={contentType}
                creator={creatorName}
                data={data}
                id={movieId}
                originalTitle={data.name}
                releaseDate={data.first_air_date}
              />
            ) : (
              <PrimaryInfo
                contentType={contentType}
                data={data}
                id={movieId}
                originalTitle={data.original_title}
                releaseDate={data.release_date}
              />
            )}
          </div>
        </div>
        <div className={style["secondary-info"]}>
          <div className={style.wrapper}>
            <CastInfo />
            {(contentType === 'tv')
              ? (
                <CurrentSeason />
              )
              : undefined}
            <UserReview />
            <Suspense fallback={<Spinner />}>
              <Recommendation contentType={contentType} id={parsedMovieId} />
            </Suspense>
          </div>
          <div>
            <StatsPanel
              contentType={contentType}
              id={parsedMovieId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
