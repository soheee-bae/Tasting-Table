import React, { useContext } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import axios from 'axios';
import styles from './App.module.scss';

import AuthContext from 'contexts/authContext';

import Navbar from 'components/Navbar/navbar';
import Footer from 'components/Footer/footer';

import Home from 'pages/Home/home';
import Login from 'pages/Login/login';
import Signup from 'pages/Signup/signup';
import Profile from 'pages/Profile/profile';
import Bookmark from 'pages/Bookmark/bookmark';
import MyRecipe from 'pages/MyRecipe/myRecipe';
import NewRecipe from 'pages/NewRecipe/newRecipe';
import EditRecipe from 'pages/EditRecipe/editRecipe';
import Details from 'pages/Details/details';
import Search from 'pages/Search/search';

axios.defaults.withCredentials = true;

function App() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <div className={styles.main}>
        <Routes>
          <Route index element={<Home />} />
          <Route path={`/search`} element={<Search />} />
          <Route path={`/recipe/:recipeId`} element={<Details />} />

          {!loggedIn ? (
            <>
              <Route path={'/login'} element={<Login />} />
              <Route path={'/signup'} element={<Signup />} />
            </>
          ) : (
            <>
              <Route path={'/newrecipe'} element={<NewRecipe />} />
              <Route path={`/editrecipe/:recipeId`} element={<EditRecipe />} />
              <Route path={'/myrecipe'} element={<MyRecipe />} />
              <Route path={'/profile'} element={<Profile />} />
              <Route path={'/bookmark'} element={<Bookmark />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
