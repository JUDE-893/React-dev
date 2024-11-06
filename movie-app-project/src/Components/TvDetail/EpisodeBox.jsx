import {memo} from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";

export default memo( function(props) {

  return(
    <div className='episode-box '>
        {console.log('episoder :: ',props.data)}
        <Link to={`/tvdetail/${props.tvName}/${props.ID}/${props.aboutSeason}/${props.seasonId}/episode/${props.data.episode_number}`} className="episode-pannel" style={{background: props.data.still_path ? `url('https://image.tmdb.org/t/p/w500${props.data.still_path}')` : "url('https://cdn.dribbble.com/users/2549306/screenshots/14306992/media/1568f08221d5a887546e2d386179ff4b.png?compress=1&resize=1000x750&vertical=top')" }}  alt="@moviepannel" >
            <FontAwesomeIcon className="details" icon={faEllipsis} />
        </Link>
        <div className="movie-content">
          <div className="movie-year">{(props.data.name)}</div>
        </div>
    </div>
  )
})
