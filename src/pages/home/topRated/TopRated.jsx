import React,{useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTab/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousal from '../../../components/carousel/Carousel'

const TopRated = () => {
    const [endpoint, setEndpoint] = useState('movie');

    const {data,loading} = useFetch(`/${endpoint}/top_rated`);

    const onTabChange = (tab) =>{
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };


  return (
    <div className='carousalSection'>
      <ContentWrapper>
        <span className="carousalTitle">Top Rated</span>
        <SwitchTabs data={['Movies','TV Shows']} onTabChange={onTabChange}/>
      </ContentWrapper>
      <Carousal data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default TopRated
