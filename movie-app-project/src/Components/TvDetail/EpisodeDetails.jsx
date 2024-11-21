import { useParams } from 'react-router-dom';
import {useState,useEffect,memo} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLink,faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import NavigateBack from '../NavigateBack';

export default memo( function EpisodeDetails(props) {

  const { about,ID,seasonID,episodeID,season} = useParams(),
   [data,setData] = useState({});

   useEffect( () => {
      axios.get(`https://api.themoviedb.org/3/tv/${ID}/season/${seasonID}/episode/${episodeID}?api_key=231423fc80b78690e4e5f233f191b78b`).then( (response) => {setData(response.data);console.log('season : ',response.data)})
      .catch( (e) => {console.log("Error : ", e)});

    },[ID,seasonID,episodeID ]);

    return (
      <div className='episode-detail'>

        <NavigateBack pageName={data.name} />

        <div className="detail-head row ">
          <img className="episode-poster col" src={data.still_path ? `https://image.tmdb.org/t/p/w500${data.still_path}` : "https://cdn.dribbble.com/users/2549306/screenshots/14306992/media/1568f08221d5a887546e2d386179ff4b.png?compress=1&resize=1000x750&vertical=top"} alt="" />

          <div className="season-info col">
            <p className='movie-title'>{about}</p>
            <p className='release-date'>{season}</p>
            <p className='release-date'>{data.name}</p>
          </div>
          <div className='episode-content'>
              <p className='s-para'>{data.overview && data.overview.length > 0 ? data.overview : "Oops! No overview available. "}</p>
              <p className='release-date mb-5'><span className='released'>Released : </span>{data.air_date}</p>
          </div>
        </div>

      </div>
    )

})
