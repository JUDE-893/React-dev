import {memo,useState} from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";


export default memo( function MovieBox(props) {

  var stringReducer = function(strg,lmt) {
    if (strg.length > lmt){
      return (strg.slice(0,lmt)+"...")
    };return strg
  }

  return (
    <div className="movie-box">
      <Link to={`/${props.type === 'tv' ? props.type : ""}detail/${props.data.id}`} className="movie-pannel" style={{background:props.data.poster_path ? `url('https://image.tmdb.org/t/p/w500/${props.data.poster_path}')` : "url('https://cdn.dribbble.com/users/2549306/screenshots/14306992/media/f7c46c1ebbd7195bed3b6aa27228b1fd.png?compress=1&resize=1200x900&vertical=top')"}}  alt="@moviepannel" ><FontAwesomeIcon className="details" icon={faEllipsis} /></Link>
      <div className="movie-content">
        <p className="">{stringReducer((props.data.original_title ?? props.data.original_name),23)}</p>
        <div className="movie-year">{(props.data.release_date ?? props.data.first_air_date).split('-')[0]}</div>
      </div>
    </div>
  )
})
