import {memo,useState} from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";


export default memo( function SeasonBox(props) {

  var stringReducer = function(strg,lmt) {
    if (strg.length > lmt){
      return (strg.slice(0,lmt)+"...")
    };return strg
  }

  return (
    <div key={props.key} className="movie-box">
      {console.log(props.data, ' : SEASON BOX', props, ': props')}
      <Link to={`/tvdetail/${props.tvName}/${props.ID}/season/${props.index}`} className="movie-pannel" style={{background: props.data.poster_path ? `url('https://image.tmdb.org/t/p/w500/${props.data.poster_path}')` : "url('https://cdn.dribbble.com/users/2549306/screenshots/14306992/media/0be875c520dcf6b4b7176738ec346334.png?compress=1&resize=1000x750&vertical=top')"}}  alt="@moviepannel" ><FontAwesomeIcon className="details" icon={faEllipsis} /></Link>
      <div className="movie-content">
        <p className="">{stringReducer(props.data.name ,23)}</p>
        <div className="movie-year">{(props.data.episode_count)}</div>
      </div>
    </div>
  )
})
