import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Spacer from "../components/Spacer/Spacer";

const RootLayout = () => (
  <>
    <Navbar />
    <Spacer />
    <Outlet />
    <Footer />
  </>
);

export default RootLayout;
