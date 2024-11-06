import { useParams } from 'react-router-dom';
import {useState,useEffect,memo} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLink,faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import EpisodeBox from './EpisodeBox';
import NavigateBack from '../NavigateBack';
import Pagination from '../Pagination';




export default memo( function SeasonDetail(props) {

  const { about,ID,seasonID } = useParams(),
   [data,setData] = useState({}),
   [pageIndex,setPageIndex] = useState(0);


   var pages = data.episodes ? (Math.floor(data.episodes.length / 50) + (data.episodes.length % 50 !== 0 ? 1 : 0)) :0;



   useEffect( () => {
      axios.get(`https://api.themoviedb.org/3/tv/${ID}/season/${seasonID}?api_key=231423fc80b78690e4e5f233f191b78b`).then( (response) => {setData(response.data);console.log('season : ',response.data)})
      .catch( (e) => {console.log("Error : ", e)});

    }, [ID,seasonID]);


    return (
      <div className="season-detail" style={{
      backgroundImage: `linear-gradient(rgba(40, 44, 52, 0.9), rgba(40, 44, 52, 1)), url('https://image.tmdb.org/t/p/w500/${data.poster_path}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}>

        <NavigateBack pageName={data.name} />

        <div className="detail-head row ">
          <img className="detail-poster col" src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="" />

          <div className="season-info col">
            <p className='movie-title'>{about}</p>
            <p className='release-date'>{data.name}</p>
            <p className='s-para'>{data.overview && data.overview.length > 0 ? data.overview : "Oops! No overview available. "}</p>
          </div>

          <p className="overview-title">{data.episodes && data.episodes.length} Episodes</p>
          <div class="Episode-container ">
            {data.episodes && data.episodes.slice(pageIndex*50, pageIndex*50+50).map( (epd,index) => {
              return <EpisodeBox  data={epd} index={index+1} tvName={about} aboutSeason={data.name} ID={ID} seasonId={seasonID}/>
            })}
          </div>
          {pages >1 && <Pagination setPageIndex={setPageIndex}  pageIndex={pageIndex} pagesIndexes={pages} />}
        </div>



      </div>
    )
})
