import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import SignupCTA from "../../components/SignupCTA/SignupCTA";
import Hero from "../../components/Hero/Hero";
import CardList from "../../components/CardList/CardList";
import style from "./home-page.module.scss";
import { fetchPopularData, fetchTrendingData } from "../../service/api";
import { CONTENT_TYPE, TIME_WINDOW } from "../../constants/constants";
import 'react-toastify/dist/ReactToastify.css';
import { notifyError } from "../../utils/helpers";

const tabsOfPopularList = ["On TV", "In Theaters"];
const tabsOfTrendingList = ["Today", "This Week"];
const defaultPopularTab = tabsOfPopularList[0];
const defaultTrendingTab = tabsOfTrendingList[0];

const HomePage = () => {
  const [isLoading, setIsLoading] = useState({ popular: true, trending: true });
  const [selectedTab, setSelectedTab] = useState({ popular: defaultPopularTab, trending: defaultTrendingTab });
  const [data, setData] = useState({ popular: [], trending: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingResponse, popularResponse] = await Promise.all([
          fetchTrendingData(selectedTab.trending === defaultTrendingTab ? TIME_WINDOW.DAY : TIME_WINDOW.WEEK),
          fetchPopularData(selectedTab.popular === defaultPopularTab ? CONTENT_TYPE.TV : CONTENT_TYPE.MOVIE),
        ]);
        setData({ trending: trendingResponse, popular: popularResponse });
      }
      catch (err) {
        notifyError(err);
      }
      finally {
        setIsLoading({ popular: false, trending: false });
      }
    };

    fetchData();
  }, [selectedTab]);

  const handleTabSelection = async (event, type) => {
    setIsLoading((prevState) => ({ ...prevState, [type]: true }));
    const currentTab = event.target.value;
    setSelectedTab((prevState) => ({ ...prevState, [type]: currentTab }));
  };

  return (
    <>
      <ToastContainer />
      <Hero />
      <div className={style.wrapper}>
        <CardList
          data={data.trending}
          handleTabSelection={(event) => handleTabSelection(event, 'trending')}
          isLoading={isLoading.trending}
          label="Trending"
          selectedTab={selectedTab.trending}
          tabs={tabsOfTrendingList}
        />
      </div>
      <CardList
        data={data.popular}
        handleTabSelection={(event) => handleTabSelection(event, 'popular')}
        isLoading={isLoading.popular}
        label="What's Popular"
        selectedTab={selectedTab.popular}
        tabs={tabsOfPopularList}
      />
      <SignupCTA />
    </>
  );
};

export default HomePage;
