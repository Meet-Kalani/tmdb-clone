import SearchResultCategory from "../../components/SearchResultCategory/SearchResultCategory";
import ResultCardList from "../../components/ResultCardList/ResultCardList";
import style from "./search-result-page.module.scss";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../constants/constants";
import { VITE_API_READ_ACCESS_TOKEN } from "../../constants/envConstants";
import { useState, useEffect } from "react";
import axios from "axios";

const categories = [
  {
    id: 1,
    label: "Movies",
    href: "#",
    count: 103,
    searchParam: "movie",
  },
  {
    id: 2,
    label: "TVShows",
    href: "#",
    count: 23,
    searchParam: "tv",
  },
  {
    id: 5,
    label: "Keywords",
    href: "#",
    count: 2,
    searchParam: "keyword",
  },
  {
    id: 6,
    label: "Collections",
    href: "#",
    count: 0,
    searchParam: "collection",
  },
  {
    id: 3,
    label: "People",
    href: "#",
    count: 27,
    searchParam: "person",
  },
  {
    id: 4,
    label: "Companies",
    href: "#",
    count: 33,
    searchParam: "company",
  },
];

const SearchResultPage = () => {
  const [urlParams] = useSearchParams();
  const [searchData, setSearchData] = useState([]);
  const [openLinkId, setOpenLinkId] = useState(1);
  const [resultCardListData, setResultCardListData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = categories.map(({ id, label, href, searchParam }) =>
          axios
            .get(
              `${BASE_URL}/search/${searchParam}?query=${urlParams.get("query")}`,
              {
                headers: {
                  Authorization: `Bearer ${VITE_API_READ_ACCESS_TOKEN}`,
                },
              }
            )
            .then((res) => ({
              id: id,
              href: href,
              label: label,
              searchParam: searchParam,
              data: res.data.results,
            }))
        );
        const results = await Promise.all(requests);
        setSearchData(results);
        setResultCardListData(
          results.filter((data) => data.id === openLinkId)[0].data
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [urlParams, openLinkId]);

  return (
    <section className={style["search-result-page"]}>
      <SearchResultCategory
        openLinkId={openLinkId}
        setOpenLinkId={setOpenLinkId}
        searchData={searchData}
      />
      {console.log(resultCardListData.length > 0 && "damn")}
      {resultCardListData.length > 0 && (
        <ResultCardList data={resultCardListData} />
      )}
    </section>
  );
};

export default SearchResultPage;
