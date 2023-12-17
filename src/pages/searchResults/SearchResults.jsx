import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"
import "./style.scss"


import { fetchDataApi } from "../../utils/api"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import MovieCard from "../../components/movieCard/MovieCard"
import Spinner from "../../components/Spinner/Spinner"
import noResults from "../../assets/no-results.png"

const SearchResults = () => {
  const [data, setData] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const { query } = useParams();  


  const fetchInitialData = () => {
    setLoading(true);
    fetchDataApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      });
  };

  
  
  const FetchNextPageData = () => {
    setLoading(true);
    fetchDataApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        if (data?.results) {
          setData((prevData) => ({
            ...prevData,
            results: [...prevData.results, ...(res.data?.results || [])],
          }));
        } else {
          setData(res.data);
        }
        setPageNum((prev) => prev + 1);
        setLoading(false);
      });
  };
   

  useEffect(()=>{
    setPageNum(1);
    fetchInitialData(); 
  },[query])



  console.log('data:', data);
  console.log('query:', query);


  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading &&(
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data?.total_results > 1 ? "Results" : "Result"} for "${query}"`}
              </div>
              <InfiniteScroll className="content"
                dataLength={data?.results?.length || []}
                next={FetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) =>{
                   if(item.media_type && item.media_type === "person") return null;
                   return(
                    <MovieCard 
                      data={item}
                      key={index}
                      fromSearch={true}
                      mediaType={item.media_type}
                    />
                   )
                })}
              </InfiniteScroll>
                 
            </>
          ):(
            <span className="resultNotFound">
              Sorry, Results not found !!
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResults
