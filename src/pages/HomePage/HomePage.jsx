import SignupCTA from "../../components/SignupCTA/SignupCTA";
import Hero from "../../components/Hero/Hero";
import CardList from "../../components/CardList/CardList";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/constants";
import axios from "axios";
import { VITE_API_READ_ACCESS_TOKEN } from "../../constants/envConstants";

const tabsOfPopularList = ["On TV", "In Theaters"];
const tabsOfTrendingList = ["Today", "This Week"];

const HomePage = () => {
  const [popularSelectedTab, setPopularSelectedTab] = useState("On TV");
  const [trendingSelectedTab, setTrendingSelectedTab] = useState("Today");
  const [popularData, setPopularData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  useEffect(() => {
    fetchPopularData("movie");
    fetchTrendingData("day");
  }, []);

  const handlePopularTabSelection = (event) => {
    const currentTab = event.target.textContent;
    setPopularSelectedTab(currentTab); 
    if (currentTab === "On TV") {
      fetchPopularData("tv");
    } else {
      fetchPopularData("movie");
    }
  };

  const handleTrendingTabSelection = (event) => {
    const currentTab = event.target.textContent;
    setTrendingSelectedTab(currentTab);
    if (currentTab === "Today") {
      fetchTrendingData("day");
    } else {
      fetchTrendingData("week");
    }
  };

  const fetchTrendingData = (time_window) => {
    axios
      .get(`${BASE_URL}/trending/movie/${time_window}`, {
        headers: {
          Authorization: `Bearer ${VITE_API_READ_ACCESS_TOKEN}`,
        },
      })
      .then((res) => setTrendingData(res.data.results))
      .catch((err) => console.error(err));
  };
  const fetchPopularData = (category) => {
    axios
      .get(`${BASE_URL}/${category}/popular`, {
        headers: {
          Authorization: `Bearer ${VITE_API_READ_ACCESS_TOKEN}`,
        },
      })
      .then((res) => setPopularData(res.data.results))
      .catch((err) => console.error(err));
  };
  return (
    <>
      <Hero />
      <CardList
        tabs={tabsOfTrendingList}
        data={trendingData}
        selectedTab={trendingSelectedTab}
        handleTabSelection={handleTrendingTabSelection}
        label="Trending"
      />
      <CardList
        tabs={tabsOfPopularList}
        data={popularData}
        selectedTab={popularSelectedTab}
        handleTabSelection={handlePopularTabSelection}
        label="What's Popular"
      />
      <SignupCTA />
    </>
  );
};

export default HomePage;
