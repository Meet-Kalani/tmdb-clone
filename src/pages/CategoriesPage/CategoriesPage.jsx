import { useLocation, useParams } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {
  useCallback, useEffect, useMemo, useState,
} from "react";
import style from "./categories-page.module.scss";
import Filters from "../../components/Filters/Filters";
import CategoryList from "../../components/CategoryList/CategoryList";
import { CATEGORY_TITLE } from "../../utils/categoryTitle";
import useTitle from "../../hooks/useTitle";
import {
  fetchCategoriesContent, fetchFilteredContent,
} from "../../service/api";
import { buildFilterQueryURL, notifyError, removeDuplicates } from "../../utils/helpers";
import { AVAILABILITIES } from "../../utils/availabilities";
import SelectedFilterContext from "./context";

const defaultSelectedSort = 'popularity.desc';

const CategoriesPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const contentType = location.pathname.includes('tv') ? 'tv' : 'movie';
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const [selectedFilters, setSelectedFilters] = useState({
    sort: defaultSelectedSort,
    OTTRegion: 'IN',
    watchProviders: new Set(),
    availabilities: new Set(AVAILABILITIES.map(({ label }) => label)),
    genres: new Set(),
    certifications: new Set(),
    language: "en",
    userScore: {
      gte: 0,
      lte: 10,
    },
    minimumUserVotes: {
      gte: 0,
    },
    runtime: {
      gte: 0,
      lte: 400,
    },
  });

  const [isScrollable, setIsScrollable] = useState(false);

  const { title } = CATEGORY_TITLE.find(({ urlSlug }) => urlSlug === category);
  const documentTitle = `${title} ${contentType === 'tv' ? 'TV Shows' : 'Movies'} — The Movie Database (TMDB)`;
  useTitle(documentTitle);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCategoriesContent(category, contentType, 1);
        setData(res);
      }
      catch (err) {
        notifyError(err);
      }
      finally {
        setIsLoading(false);
        setIsScrollable(false);
      }
    })();
  }, [category, contentType]);

  const fetchData = useCallback(async (isFilterChanged) => {
    const {
      sort,
      OTTRegion,
      watchProviders,
      availabilities,
      genres,
      certifications,
      language,
      userScore,
      minimumUserVotes,
      runtime,
    } = selectedFilters;

    const availabilityArray = Array.from(availabilities);
    const availabilityParam = availabilityArray.includes("Search all availabilities?") ? undefined : availabilityArray.join('|');
    const genreParam = Array.from(genres).join('|');
    const certificationParam = Array.from(certifications).join('|');
    const watchProvidersParam = Array.from(watchProviders).join('|');

    const filterQueryURL = buildFilterQueryURL(
      OTTRegion,
      pageNumber,
      watchProvidersParam,
      sort,
      availabilityParam,
      genreParam,
      certificationParam,
      language,
      userScore,
      minimumUserVotes,
      runtime,
    );

    try {
      const res = await fetchFilteredContent(contentType, filterQueryURL);
      setData((previousValue) => {
        if (isFilterChanged) {
          return res;
        }
        const results = removeDuplicates([...previousValue.results, ...res.results]);
        return {
          page: res.page,
          results,
          total_pages: res.total_pages,
          total_results: res.total_results,
        };
      });
    }
    catch (err) {
      notifyError(err);
    }
    finally {
      if (isFilterChanged) {
        setPageNumber(1);
        setIsScrollable(false);
      }
      setPageNumber((previousValue) => previousValue + 1);
    }
  }, [contentType, pageNumber, selectedFilters]);

  const toggleSort = (sort) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      sort,
    }));
  };

  const toggleOTTRegion = (region) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      OTTRegion: region,
    }));
  };

  const toggleWatchProviders = useCallback((watchProvider) => {
    setSelectedFilters((prevState) => {
      const newWatchProviders = new Set(prevState.watchProviders);
      if (newWatchProviders.has(watchProvider)) {
        newWatchProviders.delete(watchProvider);
      }
      else {
        newWatchProviders.add(watchProvider);
      }
      return {
        ...prevState,
        watchProviders: newWatchProviders,
      };
    });
  }, []);

  const toggleScrolling = () => {
    setIsScrollable(true);
  };

  const toggleGenres = (genre) => {
    setSelectedFilters((prevFilters) => {
      const newGenres = new Set(prevFilters.genres);
      if (newGenres.has(genre)) {
        newGenres.delete(genre);
      }
      else {
        newGenres.add(genre);
      }
      return {
        ...prevFilters,
        genres: newGenres,
      };
    });
  };

  const toggleCertifications = (certification) => {
    setSelectedFilters((prevFilters) => {
      const newCertifications = new Set(prevFilters.certifications);
      if (newCertifications.has(certification)) {
        newCertifications.delete(certification);
      }
      else {
        newCertifications.add(certification);
      }
      return {
        ...prevFilters,
        certifications: newCertifications,
      };
    });
  };

  const toggleLanguage = (language) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      language,
    }));
  };

  const toggleUserScore = (e, newValue) => {
    const [gte, lte] = newValue;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      userScore: { gte, lte },
    }));
  };

  const toggleMinimumUserVotes = (e, newValue) => {
    const [gte] = newValue;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      minimumUserVotes: { gte },
    }));
  };

  const toggleRuntime = (e, newValue) => {
    const [gte, lte] = newValue;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      runtime: { gte, lte },
    }));
  };

  const toggleAvailabilities = (availability) => {
    setSelectedFilters((prevFilters) => {
      const newSelectedAvailabilities = new Set(prevFilters.availabilities);
      if (newSelectedAvailabilities.has(availability)) {
        newSelectedAvailabilities.delete(availability);
      }
      else {
        newSelectedAvailabilities.add(availability);
      }
      return {
        ...prevFilters,
        selectedAvailabilities: newSelectedAvailabilities,
      };
    });
  };

  const memoizedSelectedFilterValue = useMemo(() => ({
    ...selectedFilters,
    contentType,
    toggleWatchProviders,
    fetchData,
    toggleOTTRegion,
    toggleSort,
    toggleAvailabilities,
    toggleUserScore,
    toggleMinimumUserVotes,
    toggleRuntime,
    toggleCertifications,
    toggleGenres,
    toggleLanguage,
  }), [selectedFilters, contentType, toggleWatchProviders, fetchData]);

  return (
    <>
      <ToastContainer />
      <div className={style['category-page']}>
        <div className={style['category-header']}>
          <h2 className={style['category-title']}>{`${title} ${contentType === 'tv' ? 'TV Shows' : 'Movies'}`}</h2>
        </div>
        <div className={style['category-body']}>
          <SelectedFilterContext.Provider value={memoizedSelectedFilterValue}>
            <Filters />
          </SelectedFilterContext.Provider>
          <CategoryList
            contentType={contentType}
            data={data}
            fetchData={fetchData}
            isLoading={isLoading}
            isScrollable={isScrollable}
            toggleScrolling={toggleScrolling}
          />
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
