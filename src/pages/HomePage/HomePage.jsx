import SignupCTA from "../../components/SignupCTA/SignupCTA";
import Hero from "../../components/Hero/Hero";
import MovieCardList from "../../components/MovieCardList/MovieCardList";
import { useEffect, useState } from "react";
import style from "./home-page.module.scss";
import { fetchPopularData, fetchTrendingData } from "../../helpers/DataPullers";
const tabsOfPopularList = ["On TV", "In Theaters"];
const tabsOfTrendingList = ["Today", "This Week"];
import { useNavigate } from "react-router-dom";

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
      } catch (err) {
        console.error(err);
        navigate('/not-found');
      } finally {
        setPopularIsLoading(false);
        setTrendingIsLoading(false);
      }
    }

    fetchData();
  }, [navigate]);

  const handlePopularTabSelection = async (event) => {
    setPopularIsLoading(true);
    const currentTab = event.target.textContent;
    setPopularSelectedTab(currentTab);
    try {
      if (currentTab === "On TV") {
        setPopularData(await fetchPopularData("tv"));
      } else {
        setPopularData(await fetchPopularData("movie"));
      }
    } catch (err) {
      console.error(err);
      navigate('/not-found');
    } finally {
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
      } else {
        setTrendingData(await fetchTrendingData("week"));
      }
    } catch (err) {
      console.error(err);
      navigate('/not-found');
    } finally {
      setTrendingIsLoading(false);
    }
  };
  return (
    <>
      <Hero />
      <div className={style["wrapper"]}>
        <MovieCardList
          tabs={tabsOfTrendingList}
          data={trendingData}
          selectedTab={trendingSelectedTab}
          handleTabSelection={handleTrendingTabSelection}
          label="Trending"
          isLoading={trendingIsLoading}
        />
      </div>
      <MovieCardList
        tabs={tabsOfPopularList}
        data={popularData}
        selectedTab={popularSelectedTab}
        handleTabSelection={handlePopularTabSelection}
        label="What's Popular"
        isLoading={popularIsLoading}
      />
      <SignupCTA />
    </>
  );
};

export default HomePage;
