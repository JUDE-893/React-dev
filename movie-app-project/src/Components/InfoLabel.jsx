import {memo,useState,useEffect,Children} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay,faStar} from "@fortawesome/free-solid-svg-icons";
import {faClock} from "@fortawesome/free-regular-svg-icons";



export default memo(function InfoLabel(props) {

    const {itm,ind,setmovieId,titleLimit,overviewLimit,setOverExpanded} = props;
    const [button , genre,readMore] = Children.toArray(props.children);

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


  // the function that returns the amount of Hours and Minutes from a number given to it
  var toTime = function(n) {
    return (n >= 0 ? (`${Math.floor(n/60)}h ${n % 60}min`) : (`${n}min`));
  }

  return (
    <div key={itm.id} className={`${props.className} ${ind === 0 ?'active' : ''}`} style={{background: `linear-gradient(90deg,rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url('https://image.tmdb.org/t/p/w780/${itm.backdrop_path}')`}}>

        <p className='movie-title'>{(itm.original_title ?? itm.original_name ?? "").slice(0,titleLimit)+(itm.original_title && (itm.original_title.length > titleLimit) ? '..' : '')}</p>
        <p className="release-date" >{(itm.release_date ?? itm.first_air_date ?? "").split('-')[0]}</p>
        <p className="overview-title">overview :</p>
        <p className='s-para overview'>
          {stringReducer((itm.overview ?? ''),overviewLimit)}
        {(itm.overview && itm.overview.length > 200 && typeof props.setOverExpanded !== 'undefined' ? readMore : "")}
        </p>
        <div className="movie-rating">
          <FontAwesomeIcon icon={faStar} />{(itm.vote_average ?? 0).toFixed(2)}
          <FontAwesomeIcon icon={faClock} />{itm.runtime ? toTime(itm.runtime) : '2h 15min'}
        </div>
        <div className="element-buttons">
          <button type="button" className=' btn-playo' onClick={() => setmovieId(itm.id ?? 0)}><FontAwesomeIcon icon={faPlay} />Play</button>
          {button}
        </div>
        {genre ?? ""}
    </div>
  )
})
