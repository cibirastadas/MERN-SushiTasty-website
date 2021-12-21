import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import axiosInterceptor from "./axios/axiosInterceptor";
const App = () => {
  axiosInterceptor();
  return (
    <div className="App">
      <Router>
        <NavBar />
        <AppRoutes />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
