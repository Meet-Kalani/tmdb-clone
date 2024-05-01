import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError } from "../../utils/helpers";
import style from "./details-page.module.scss";
import PrimaryInfo from "../../components/PrimaryInfo/PrimaryInfo";
import CastInfo from "../../components/CastInfo/CastInfo";
import StatsPanel from "../../components/StatsPanel/StatsPanel";
import UserReview from "../../components/UserReview/UserReview";
import CurrentSeason from "../../components/CurrentSeason/CurrentSeason";
import Recommendation from "../../components/Recommendation/Recommendation";
import { fetchMovieData, fetchTVData } from "../../service/api";
import { BACKDROP_BASE_URL } from "../../constants/constants";
import useTitle from "../../hooks/useTitle";

const DetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [data, setData] = useState({});
  const contentType = location.pathname.includes('tv') ? 'tv' : 'movie';
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const res = contentType === 'tv' ? await fetchTVData(movieId) : await fetchMovieData(movieId);
        setData(res);
      }
      catch (err) {
        notifyError(err, style.toast);
      }
      finally {
        setIsLoading(false);
      }
    })();
  }, [movieId, navigate, contentType]);

  const backdropStyle = {
    background: `linear-gradient(to right, rgb(32, 32, 32) calc(-510px + 50vw), rgba(32, 32, 32, 0.84) 50%, rgba(32, 32, 32, 0.84) 100%), url(${BACKDROP_BASE_URL}${data.backdrop_path})`,
  };

  const documentTitle = `${data.name || data.original_title} (${data?.first_air_date?.slice(0, 4) || data?.release_date?.slice(0, 4)}) — The Movie Database (TMDB)`;
  useTitle(documentTitle);

  const creatorName = data?.created_by?.[0]?.name ?? undefined;
  const parsedMovieId = parseInt(movieId, 10);

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
                isLoading={isLoading}
                notifyError={notifyError}
                originalTitle={data.name}
                releaseDate={data.first_air_date}
              />
            ) : (
              <PrimaryInfo
                contentType={contentType}
                data={data}
                id={movieId}
                isLoading={isLoading}
                notifyError={notifyError}
                originalTitle={data.original_title}
                releaseDate={data.release_date}
              />
            )}
          </div>
        </div>
        <div className={style["secondary-info"]}>
          <div className={style.wrapper}>
            <CastInfo contentType={contentType} id={parsedMovieId} notifyError={notifyError} />
            {(contentType === 'tv')
              ? (
                <CurrentSeason
                  data={data}
                  isLoading={isLoading}
                />
              )
              : undefined}
            <UserReview contentType={contentType} id={parsedMovieId} notifyError={notifyError} />
            <Recommendation contentType={contentType} id={parsedMovieId} notifyError={notifyError} />
          </div>
          <div>
            <StatsPanel
              contentType={contentType}
              data={data}
              id={parsedMovieId}
              isLoading={isLoading}
              notifyError={notifyError}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
