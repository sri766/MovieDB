import React,{useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTab/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousal from '../../../components/carousel/Carousel'
const Trending = () => {
    const [endpoint, setEndpoint] = useState('day');

    const {data,loading} = useFetch(`/trending/all/${endpoint}?`);

    const onTabChange = (tab) =>{
        setEndpoint(tab === "Day" ? "day" : "week");
    };


  return (
    <div className='carousalSection'>
      <ContentWrapper>
        <span className="carousalTitle">Trending</span>
        <SwitchTabs data={['Day','Week']} onTabChange={onTabChange}/>
      </ContentWrapper>
      <Carousal data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending
