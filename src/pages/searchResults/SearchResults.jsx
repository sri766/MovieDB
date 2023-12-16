import React, {useEffect, useState} from "react"
import {useParam} from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"
import "./style.scss"


import { fetchDataApi } from "../../utils/api"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import movieCard from "../../components/movieCard/MovieCard"
import Spinner from "../../components/spinner/Spinner"
import noResults from "../../assets/images/no-results.png"


const SearchResults = () => {
  return (
    <div>
      searchResults
    </div>
  )
}

export default SearchResults
