import SignupCTA from "../../components/SignupCTA/SignupCTA";
import Hero from "../../components/Hero/Hero";
import CardList from "../../components/CardList/CardList";
import { useEffect, useState } from "react";
import style from "./home-page.module.scss";
import { fetchPopularData, fetchTrendingData } from "../../helpers/DataPullers";

const tabsOfPopularList = ["On TV", "In Theaters"];
const tabsOfTrendingList = ["Today", "This Week"];

const HomePage = () => {
  const [popularSelectedTab, setPopularSelectedTab] = useState("On TV");
  const [trendingSelectedTab, setTrendingSelectedTab] = useState("Today");
  const [popularData, setPopularData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  useEffect(() => {
    fetchTrendingData("day").then((res) => setTrendingData(res));
    fetchPopularData("tv").then((res) => setPopularData(res));
  }, []);

  const handlePopularTabSelection = (event) => {
    const currentTab = event.target.textContent;
    setPopularSelectedTab(currentTab);
    if (currentTab === "On TV") {
      fetchPopularData("tv").then((res) => setPopularData(res));
    } else {
      fetchPopularData("movie").then((res) => setPopularData(res));
    }
  };

  const handleTrendingTabSelection = (event) => {
    const currentTab = event.target.textContent;
    setTrendingSelectedTab(currentTab);
    if (currentTab === "Today") {
      fetchTrendingData("day").then((res) => setTrendingData(res));
    } else {
      fetchTrendingData("week").then((res) => setTrendingData(res));
    }
  };
  return (
    <>
      <Hero />
      <div className={style["wrapper"]}>
        <CardList
          tabs={tabsOfTrendingList}
          data={trendingData}
          selectedTab={trendingSelectedTab}
          handleTabSelection={handleTrendingTabSelection}
          label="Trending"
        />
      </div>
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
