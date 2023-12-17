import React,{ useEffect, useState } from 'react'
import './style.scss'

import useFetch from '../../../hooks/useFetch'

import SearchResults from '../../searchResults/SearchResults'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'


const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const {data,loading} = useFetch("/movie/popular");
  const {url} = useSelector((state)=> state.home);

  useEffect(()=>{
    const bg = url?.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  },[data]);


  const handleSearch = (event) =>{
    if(event.key === "Enter" && query.length > 0){
      navigate(`/search/${query}`);
    }
  }
  return (
    <div className='heroBanner'>

      {!loading && 
        <div className="backdrop_img">
          <Img src={background} />
        </div>
      }

      <div className="opacityLayer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className='title'>
            Welcome
          </span>
          <span className='description'>
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input 
              placeholder="Search for movies and TV Shows" 
              type="text" 
              onKeyUp = {handleSearch}
              onChange={(event)=> setQuery(event.target.value)}
            />
            <button onClick={()=>navigate(`/search/${query}`)}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
