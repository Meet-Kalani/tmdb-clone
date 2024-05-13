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
  fetchCategoriesContent, fetchFilteredContent, fetchOTTPlatforms,
} from "../../service/api";
import { notifyError } from "../../helpers/notifyError";
import { removeDuplicates } from "../../helpers/removeDuplicates";
import { getReleaseDate } from "../../helpers/getReleaseDate";
import { buildFilterQueryURL } from "../../helpers/buildFilterQueryURL";
import { AVAILABILITIES } from "../../utils/availabilities";
import { RELEASE_TYPES } from "../../utils/releaseTypes";
import SelectedFilterContext from "./context";

const defaultSelectedSort = 'popularity.desc';
const defaultPageNumber = 1;

const CategoriesPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const contentType = location.pathname.includes('tv') ? 'tv' : 'movie';
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(defaultPageNumber);
  const [watchProvidersList, setWatchProvidersList] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({
    sort: defaultSelectedSort,
    OTTRegion: 'IN',
    watchProviders: new Set(),
    availabilities: new Set(AVAILABILITIES.map(({ label }) => label)),
    genres: new Set(),
    certifications: new Set(),
    releaseRegion: 'IN',
    language: "xx",
    releaseTypes: new Set(RELEASE_TYPES.map(({ id }) => id)),
    releaseDate: {
      gte: undefined,
      lte: getReleaseDate(),
    },
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
        setPageNumber(2);
      }
    })();
  }, [category, contentType]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchOTTPlatforms(contentType, selectedFilters.OTTRegion);
        setWatchProvidersList(res);
      }
      catch (err) {
        notifyError(err);
      }
    })();
  }, [contentType, selectedFilters.OTTRegion]);

  const fetchData = useCallback(async (isFilterChanged) => {
    const newPageNumber = isFilterChanged ? defaultPageNumber : pageNumber;
    const filterQueryURL = buildFilterQueryURL(selectedFilters, newPageNumber);
    setPageNumber(newPageNumber);

    try {
      const res = await fetchFilteredContent(contentType, filterQueryURL);
      setData((previousValue) => {
        if (isFilterChanged) {
          setPageNumber(defaultPageNumber);
          setIsScrollable(false);
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

  const toggleReleaseRegion = (region) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      releaseRegion: region,
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

  const toggleReleaseTypes = (releaseType) => {
    setSelectedFilters((prevFilters) => {
      const newReleaseTypes = new Set(prevFilters.releaseTypes);
      if (newReleaseTypes.has(releaseType)) {
        newReleaseTypes.delete(releaseType);
      }
      else {
        newReleaseTypes.add(releaseType);
      }
      return {
        ...prevFilters,
        releaseTypes: newReleaseTypes,
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

  const toggleReleaseDate = (event, type) => {
    if (type === "gte") {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        releaseDate: { ...prevFilters.releaseDate, gte: event.target.value },
      }));
    }
    else {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        releaseDate: { ...prevFilters.releaseDate, lte: event.target.value },
      }));
    }
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
        availabilities: newSelectedAvailabilities,
      };
    });
  };

  const memoizedSelectedFilterValue = useMemo(() => ({
    ...selectedFilters,
    contentType,
    watchProvidersList,
    toggleWatchProviders,
    fetchData,
    toggleOTTRegion,
    toggleSort,
    toggleReleaseTypes,
    toggleAvailabilities,
    toggleReleaseRegion,
    toggleReleaseDate,
    toggleUserScore,
    toggleMinimumUserVotes,
    toggleRuntime,
    toggleCertifications,
    toggleGenres,
    toggleLanguage,
  }), [selectedFilters, contentType, toggleWatchProviders, fetchData, watchProvidersList]);

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
