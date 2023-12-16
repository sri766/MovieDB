import { useState, useEffect } from 'react'
import './App.css'
import {fetchDataApi} from './utils/api'
import { getApiConfig, getGenres } from './store/homeSlice';
import { useSelector, useDispatch } from 'react-redux';

import Home from './pages/home/Home'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Explore from './pages/explore/Explore'
import Details from './pages/details/Details'
import SearchResults from './pages/searchResults/SearchResults'
import PageNotFound from './pages/404/PageNotFound'
import { BrowserRouter, Routes , Route } from 'react-router-dom'



function App() {

  const dispatch = useDispatch();
  const {url} =  useSelector((state)=> state.home);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);


  const fetchApiConfig = () =>{
    fetchDataApi("/configuration").then((res) => {

      const url ={
        backdrop: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original"

      }
      dispatch(getApiConfig(url));
    }
    )
  };

  const genresCall = async () =>{
    let promises = [];
    let endPoints = ["tv","movie"];
    let allGenres = [];

    endPoints.forEach((url) => {
      promises.push(fetchDataApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id] = item))
    })
    
    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/:mediaType/:id" element={<Details/>} />
          <Route path="/search/:query" element={<SearchResults/>} />
          <Route path="/explore/:mediaType" element={<Explore/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      <Footer/>
    </BrowserRouter> 
  )
}

export default App
