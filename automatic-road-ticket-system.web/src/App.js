import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import Profile from './pages/Profile';
import VerifyOTP from './pages/VerifyOTP';
import PrivateRoute from './components/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute';
import AddCar from './pages/AddCar';
import EditCar from "./pages/EditCar";
import CarDetails from './pages/CarDetails';
import CreateTicket from './pages/CreateTicket';
import Ticket from './pages/Ticket';
import UpdateTicket from "./pages/UpdateTicket";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RestrictedRoute><Main /></RestrictedRoute>} />
        <Route path="/login" element={<RestrictedRoute><LogIn /></RestrictedRoute>} />
        <Route path="/signup" element={<RestrictedRoute><SignUp /></RestrictedRoute>} />
        <Route path="/verify-otp/:email" element={<RestrictedRoute><VerifyOTP /></RestrictedRoute>} />
        <Route path="/ticket/:ticketId" element={<Ticket />} />
        {/* PrivateRoute */}
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/car-details/:vin" element={<CarDetails />} />
        <Route path="/add-car" element={<PrivateRoute><AddCar /></PrivateRoute>} />
        <Route path="/edit-car/:vin" element={<PrivateRoute><EditCar /></PrivateRoute>} />
        <Route path="/create-new-ticket" element={<PrivateRoute><CreateTicket /></PrivateRoute>} />
        <Route path="/update-ticket/:ticketId" element={<PrivateRoute><UpdateTicket /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
