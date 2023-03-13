import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Navbar from 'components/Navbar/navbar';
import Footer from 'components/Footer/footer';
import Home from 'pages/Home/home';
import Login from 'pages/Login/login';
import Signup from 'pages/Signup/signup';
import axios from 'axios';
import styles from './App.module.scss';

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Navbar />
      <div className={styles.main}>
        <Routes>
          <Route index element={<Home />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/signup'} element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
