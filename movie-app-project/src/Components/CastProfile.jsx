import {useState,useEffect,memo} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';





export default memo( function DetailsInfo(props) {


   return (
     <div className="CastProfile">
        {console.log('profile infos : :', props)}
       <Link to={`/person/${props.data.name}/${props.data.id}`}>
         <div className='profile-img rounded-circle'><img  src={props.data.profile_path ? `https://image.tmdb.org/t/p/w500/${props.data.profile_path}` : `https://avatar.iran.liara.run/public/${Math.floor(Math.random()*50)+1}`} /></div>
         <p className=''>{props.data.name}</p>
       </Link>

     </div>
   )
})
