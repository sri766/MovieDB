import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/Frame 2.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
      window.scrollTo(0,0);
    },[location]);

    const handleScroll = () => {
      if(window.scrollY > 200){
        if(window.scrollY > lastScrollY && !mobileMenu){
          setShow("hide");
        }
        else{
          setShow("show");
        }
      }
      else{
        setShow("top");
      }
      setLastScrollY(window.scrollY);
    }

    useEffect(()=>{
      window.addEventListener("scroll", handleScroll);

      return () =>{
        window.removeEventListener("scroll", handleScroll);
      }
    },[lastScrollY]);

    const openSearch = () => {
      setMobileMenu(false);
      setShowSearch(true);
    };
    
    const openMobileMenu = () => {
      setMobileMenu(true);
      setShowSearch(false);
    };


    const handleSearch = (event) =>{
      if(event.key === "Enter" && query.length > 0){
        navigate(`/search/${query}`);
        setTimeout(() => {
          setShowSearch(false);
        }, 1000);
      }
    }

    const navigationHandler = (type) => {
      if(type === "movie"){
        navigate('explore/movie');
      }else{
        navigate('explore/tv');
      }
      setMobileMenu(false);
    }

    
    return (
        <header className={`header ${mobileMenu ? "mobileView": ""} ${show}`}>
          <ContentWrapper>
            <div className="logo" onClick={()=> navigate("/")}>
              <img src={logo} alt="Movix" />
            </div>
            <ul className="menuItems">
              <li className="menuItem" onClick={()=>navigationHandler('movie')}>Movies</li>
              <li className="menuItem" onClick={()=>navigationHandler('tv')}>TV Show</li>
              <li className="menuItem"><HiOutlineSearch onClick={openSearch}/></li>
            </ul>
            <div className="mobileMenuItems">
              <HiOutlineSearch onClick={openSearch}/>
              {mobileMenu ? (
                <VscChromeClose onClick={()=>setMobileMenu(false)}/>
              ):(
                <SlMenu onClick={openMobileMenu}/>
              )}
            </div>
          </ContentWrapper>
          {showSearch && 
          <div className="searchBar">
            <contentWrapper>
              <div className="searchInput">
              <input 
                placeholder="Search for movies and TV Shows" 
                type="text" 
                onKeyUp = {handleSearch}
                onChange={(event)=> setQuery(event.target.value)}
              />
              <VscChromeClose onClick={()=>setShowSearch(false)}/>
            </div>
            </contentWrapper>
          </div>}
        </header>
    );
};

export default Header;