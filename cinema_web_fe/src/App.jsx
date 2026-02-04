import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./components/ScrollToTop";
import ViewDetail from "./pages/ViewDetail";
import Booking from "./pages/Booking";
import Memberships from "./pages/Memberships";
import MyBooking from "./pages/MyBooking";
import Offer from "./pages/Offer";
import Introduction from "./pages/Introduction";
import Guide from "./pages/Guide";
import Profile from "./pages/Profile";
import ReviewMovie from "./pages/ReviewMovie";
import WriteReview from "./pages/WriteReview";
import QrCode from "./components/QR_Code";
import PaymentTicket from "./components/PaymentTicket";
import BookingSuccess from "./pages/BookingSuccess";
import FoodCinema from "./components/FoodCinema";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/movie/:id/rate" element={<WriteReview />} />
        <Route path="/ticket/:id" element={<QrCode />} />
        <Route path="/payment" element={<PaymentTicket />} />
        <Route path="/success" element={<BookingSuccess />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/movie/:id" element={<ViewDetail />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/myBooking" element={<MyBooking />} />
          <Route path="/offers" element={<Offer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:id/reviews" element={<ReviewMovie />} />
          <Route path="/foodCinema" element={<FoodCinema />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
