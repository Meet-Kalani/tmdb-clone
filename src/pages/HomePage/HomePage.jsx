import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupCTA from "../../components/SignupCTA/SignupCTA";
import Hero from "../../components/Hero/Hero";
import MovieCardList from "../../components/MovieCardList/MovieCardList";
import style from "./home-page.module.scss";
import { fetchPopularData, fetchTrendingData } from "../../helpers/DataPullers";

const tabsOfPopularList = ["On TV", "In Theaters"];
const tabsOfTrendingList = ["Today", "This Week"];

const HomePage = () => {
  const [popularIsLoading, setPopularIsLoading] = useState(true);
  const [trendingIsLoading, setTrendingIsLoading] = useState(true);
  const [popularSelectedTab, setPopularSelectedTab] = useState("On TV");
  const [trendingSelectedTab, setTrendingSelectedTab] = useState("Today");
  const [popularData, setPopularData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTrendingData(await fetchTrendingData("day"));
        setPopularData(await fetchPopularData("tv"));
      }
      catch (err) {
        navigate("/not-found");
      }
      finally {
        setPopularIsLoading(false);
        setTrendingIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handlePopularTabSelection = async (event) => {
    setPopularIsLoading(true);
    const currentTab = event.target.textContent;
    setPopularSelectedTab(currentTab);
    try {
      if (currentTab === "On TV") {
        setPopularData(await fetchPopularData("tv"));
      }
      else {
        setPopularData(await fetchPopularData("movie"));
      }
    }
    catch (err) {
      navigate("/not-found");
    }
    finally {
      setPopularIsLoading(false);
    }
  };

  const handleTrendingTabSelection = async (event) => {
    setTrendingIsLoading(true);
    const currentTab = event.target.textContent;
    setTrendingSelectedTab(currentTab);
    try {
      if (currentTab === "Today") {
        setTrendingData(await fetchTrendingData("day"));
      }
      else {
        setTrendingData(await fetchTrendingData("week"));
      }
    }
    catch (err) {
      navigate("/not-found");
    }
    finally {
      setTrendingIsLoading(false);
    }
  };

  return (
    <>
      <Hero />
      <div className={style.wrapper}>
        <MovieCardList
          data={trendingData}
          handleTabSelection={handleTrendingTabSelection}
          isLoading={trendingIsLoading}
          label="Trending"
          selectedTab={trendingSelectedTab}
          tabs={tabsOfTrendingList}
        />
      </div>
      <MovieCardList
        data={popularData}
        handleTabSelection={handlePopularTabSelection}
        isLoading={popularIsLoading}
        label="What's Popular"
        selectedTab={popularSelectedTab}
        tabs={tabsOfPopularList}
      />
      <SignupCTA />
    </>
  );
};

export default HomePage;
