import Footer from "./components/Footer/Footer";
import SignupCTA from "./components/SignupCTA/SignupCTA";
import DesktopNavbar from "./components/DesktopNavbar/DesktopNavbar";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import Hero from "./components/Hero/Hero";
// import CardList from "./components/CardList/CardList";
import Test from "./components/Test/Test";

function App() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
      <Hero />
      <Test />
      <SignupCTA />
      <Footer />
    </>
  );
}

export default App;
