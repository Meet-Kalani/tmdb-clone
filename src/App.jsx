// import Footer from "./components/Footer/Footer";
// import SignupCTA from "./components/SignupCTA/SignupCTA";
// import DesktopNavbar from "./components/DesktopNavbar/DesktopNavbar";
// import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import Hero from "./components/Hero/Hero";
// import CardList from "./components/CardList/CardList";
// import Test from "./components/Test/Test";
import SearchResultCategory from "./components/SearchResultCategory/SearchResultCategory";

import { Routes, Route } from "react-router-dom";
// import ResultCardList from "./components/ResultCardList/ResultCardList";

function App() {
  return (
    <>
      {
        /* <DesktopNavbar />
      <MobileNavbar /> */
        <Hero />
        /*  <Test />
      <SignupCTA />
      <Footer /> */
      }
      {/* <SearchResultCategory /> */}
      {/* <ResultCard /> */}
      <Routes>
        <Route path="/search" element={<SearchResultCategory />}></Route>
      </Routes>
    </>
  );
}

export default App;
