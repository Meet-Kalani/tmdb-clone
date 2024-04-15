import ResultCard from "../ResultCard/ResultCard";
import style from "./result-card-list.module.scss";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { useEffect, useState } from "react";

const ResultCardList = () => {
  const [searchParams] = useSearchParams();
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/search/tv?query=${searchParams.get("query")}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        console.log(res.data.results)
        setSearchResult(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [searchParams]);

  return (
    <div className={style["result-card-list"]}>
      {searchResult.map(
        ({ id, poster_path, name, overview, first_air_date }) => {
          return (
            <ResultCard
              key={id}
              poster_path={poster_path}
              name={name}
              overview={overview}
              first_air_date={first_air_date}
            />
          );
        }
      )}
    </div>
  );
};
export default ResultCardList;
