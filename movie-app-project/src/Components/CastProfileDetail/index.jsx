import { useParams } from 'react-router-dom';
import {useState,useEffect,memo} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import ReadMore from '../ReadMore';
import MovieContainer from '../MovieContainer';
import MovieBox from '../MovieBox';
import NavigateBack from '../NavigateBack';

export default memo( function CastProfileDetails(props) {

  const { about,ID} = useParams(),
   [data,setData] = useState({}),
   [overExpanded,setOverExpanded] = useState(false);

   useEffect( () => {

      axios.get(`https://api.themoviedb.org/3/person/${ID}?api_key=231423fc80b78690e4e5f233f191b78b`).then( (response) => {setData(response.data);console.log('season : ',response.data)})
      .catch( (e) => {console.log("Error : ", e)});

    },[ID]);


    // function that return only the proper lenght of a string to be displzyed
    var stringReducer = function(strg,lm) {

      var stringo=strg, limit = lm;
      if (strg.length > limit){
          while(strg.charAt(limit) !== " "){
            limit +=1;
          };
          stringo = strg.slice(0,limit) + " ..." ;
      };return (stringo);
   };


    return (
      <div className="cast-detail">

        <NavigateBack pageName={data.name} />

        <p className='release-date'><span className='released fw-bold'>Born: </span>{data.birthday}<span className='released fw-bold ms-0'> In </span>{data.place_of_birth}.</p>

        <div className="detail-head row ">
          <img className="detail-profile col" src={`https://image.tmdb.org/t/p/w500${data.profile_path}`} alt="" />
          <div className="season-info col">
            <p className='s-para bios'>{stringReducer((data.biography ?? ''),(overExpanded ? 100000 : 500))}</p>
            {data.biography && data.biography.length > 300 && <ReadMore setOverExpanded={setOverExpanded} overExpanded={overExpanded} />}
          </div>
        </div>
        <MovieContainer id="known-for-movies" endpoint={`person/${ID}/movie_credits`} type=''><p className="section-title">Movies</p><MovieBox /></MovieContainer>
        <MovieContainer id="known-for-series" endpoint={`person/${ID}/tv_credits`} type='tv'><p className="section-title">Tv Shows</p><MovieBox /></MovieContainer>

      </div>
    )})
