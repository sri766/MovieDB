import { useState, useEffect } from 'react'
import './App.css'
import {fetchDataApi} from './utils/api'
import { getApiConfig } from './store/homeSlice';
import { useSelector, useDispatch } from 'react-redux';
import homeSlice from './store/homeSlice'

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
  }

  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path=":/mediaType/:id" element={<Details/>} />
          <Route path="/search/:searchQuery" element={<SearchResults/>} />
          <Route path=":/mediaType/:id" element={<Explore/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      {/* <Footer/> */}
    </BrowserRouter> 
  )
}

export default App
