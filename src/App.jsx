import Footer from "./components/Footer/Footer";
import DesktopNavbar from "./components/DesktopNavbar/DesktopNavbar";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import Router from "./router/Router";

function App() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
      <Router />
      <Footer />
    </>
  );
}

export default App;
