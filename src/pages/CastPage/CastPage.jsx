import {
  Await, Link, useLoaderData, useParams,
} from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import style from "./cast-page.module.scss";
import CastCard from "../../components/CastCard/CastCard";
import Spinner from "../../components/Spinner/Spinner";
import { CREW_DEPARTMENTS } from "../../utils/crewDepartments";
import CrewDepartment from "../../components/CrewDepartment/CrewDepartment";
import ErrorPage from "../ErrorPage/ErrorPage";
import useTitle from "../../hooks/useTitle";
import Img from "../../components/Img/Img";
import { CAST_PAGE_POSTER_BASE_URL } from "../../constants/constants";

const CastPage = () => {
  const data = useLoaderData();
  const { contentType } = useParams();
  const [documentTitleData, setDocumentTitleData] = useState({});

  useEffect(() => {
    (async () => {
      const resolvedData = await data.results;
      setDocumentTitleData({
        title: resolvedData[0].name,
        originalTitle: resolvedData[0].original_title,
        firstAIRDate: resolvedData[0].first_air_date,
        releaseDate: resolvedData[0].release_date,
      });
    })();
  }, [data]);

  const {
    title, originalTitle, firstAIRDate, releaseDate,
  } = documentTitleData;

  const documentTitle = `${title || originalTitle} (${firstAIRDate?.slice(0, 4) || releaseDate?.slice(0, 4)}) - Cast & Crew — The Movie Database (TMDB)`;
  useTitle(documentTitle);

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={data?.results}
        errorElement={
          <ErrorPage />
          }
      >
        {(results) => (
          <div className={style['cast-page']}>
            <header className={style['cast-page-header']}>
              <div className={style.wrapper}>
                <div className={style['poster-wrapper']}>
                  <Img alt={results[0].name || results[0].original_title} className={style.poster} src={`${CAST_PAGE_POSTER_BASE_URL}${results[0].poster_path}`} />
                </div>
                <div className={style['header-content']}>
                  <div className={style['title-wrapper']}>
                    <h2 className={style.title}>
                      <Link className={style['title-link']} to={`/${contentType}/${results[0].id}`}>
                        {results[0].name || results[0].original_title}
                      </Link>
                    </h2>
                    <span className={style['release-year']}>
                      (
                      {results[0].first_air_date?.slice(0, 4) || results[0].release_date?.slice(0, 4)}
                      )
                    </span>
                  </div>
                  <Link className={style['details-link']} to={`/${contentType}/${results[0].id}`}>
                    ← Back to main
                  </Link>
                </div>
              </div>
            </header>
            <div className={style['cast-page-content']}>
              <div className={style.cast}>
                <h3 className={style['cast-title']}>
                  Cast
                  {' '}
                  <span className={style['cast-count']}>{results[1].cast.length}</span>
                </h3>
                <div className={style['cards-container']}>
                  {
            results[1].cast.map(({
              profile_path: profilePath, character, name, gender, id: castId,
            }) => <CastCard character={character} gender={gender} key={castId} name={name} profilePath={profilePath} />)
          }
                </div>
              </div>
              <div className={style.crew}>
                <h3 className={style['crew-title']}>
                  Crew
                  {' '}
                  <span className={style['crew-count']}>{results[1].crew.length}</span>
                </h3>
                <div className={style['cards-container']}>
                  {CREW_DEPARTMENTS.map((department) => (
                    <CrewDepartment crew={results[1].crew} department={department} key={department} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default CastPage;
