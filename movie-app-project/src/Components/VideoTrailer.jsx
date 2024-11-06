import {useState,useEffect,memo} from 'react'
import axios from 'axios';


export default memo(function VideoTrailer(props){

  const [videoId,setVideoId] =  useState()

  useEffect( () => {

     axios.get(`https://api.themoviedb.org/3/movie/${props.Id}/videos?api_key=231423fc80b78690e4e5f233f191b78b`).then( (response) => {
       console.log('trailerss : ',response.data.results)
       for (let i of response.data.results) {
         console.log(i.name);
         if ((/\s*[A-Za-z0-9,.\-!?&()]*\s*trailer\s*[A-Za-z0-9,.\-!?&()]*/i).test(i.name)) {
           setVideoId(i.key);
           console.log('videoId: ', i.name)
         }}})
     .catch( (e) => {console.log("Error : ", e)});

   });


   return (
     <div className={`video-box ${props.className}`}>
       <iframe className='video-trailer'
               src={`https://www.youtube.com/embed/${videoId}`}
               title="YouTube video player"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowfullscreen> {console.log('trailer of ',props.Id)}
      </iframe>
    </div>
   )
})
