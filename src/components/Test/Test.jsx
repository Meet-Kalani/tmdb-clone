import CardList from "../CardList/CardList";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";

const Test = () => {
  const [selectedTab, setSelectedTab] = useState("Movies");
  const tabs = ["Movies", "TV"];
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchData("movie");
  }, []);

  const handleTabSelection = (event) => {
    const currentTab = event.target.textContent;
    setSelectedTab(currentTab);
    if (currentTab === "Movies") {
      fetchData("movie");
    } else {
      fetchData("tv");
    }
  };

  const fetchData = (category) => {
    axios
      .get(`${BASE_URL}/${category}/popular`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`,
        },
      })
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.error(err));
  };
  return <CardList tabs={tabs} movies={movies} selectedTab={selectedTab} handleTabSelection={handleTabSelection} />;
};

export default Test;
