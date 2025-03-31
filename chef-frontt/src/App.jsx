import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./Components/AboutUs";
import AdminHome from "./Components/AdminHome";
import BookNow from "./Components/BookNow";
import ChefHome from "./Components/ChefHome";
import ChefBookings from "./Components/ChefMyBookings";
import ChefSignup from "./Components/ChefSignup";
import ContactPage from "./Components/Contact";
import FindChef from "./Components/FindCHef";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ManageChefs from "./Components/ManageChefs";
import ManageUsers from "./Components/ManageUsers";
import Navbar from "./Components/Navbar";
import PaymentPage from "./Components/Payment";
import Signup from "./Components/Signup";
import ViewAllBookings from "./Components/ViewAllBookings";
import ViewProfile from "./Components/ViewProfile";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chefhome" element={<ChefHome />} />
            <Route path="/adminhome" element={<AdminHome />} />
            <Route path="/findchef" element={<FindChef/>}/>
            <Route path="/viewProfile/:chefId" element={<ViewProfile />} />
            <Route path="/booknow" element={<BookNow />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/chefmybookings" element={<ChefBookings />} />
            <Route path="/chefsignup" element={<ChefSignup />} />
            <Route path="/manageusers" element={<ManageUsers />} />
            <Route path="/managechefs" element={<ManageChefs />} />
            <Route path="/getAllBookings" element={<ViewAllBookings />} />
          </Routes>
        </div>
        {/* <Footer/> */}
      </div>
    </Router>
  );
}

export default App;
