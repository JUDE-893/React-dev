import { useParams } from 'react-router-dom';
import {useState,useEffect,memo} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLink,faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import InfoLabel from './InfoLabel';
import VideoTrailer from './VideoTrailer';
import MovieContainer from './MovieContainer';
import CastProfile from './CastProfile';
import ReviewBox from './ReviewBox';
import MovieBox from './MovieBox';
import ReadMore from './ReadMore';
import NavigateBack from './NavigateBack';
import ErrorPannel from './ErrorPannel';


export default memo( function DetailsInfo(props) {

  const params = useParams(),
  { ID } = props.ID === undefined ? params : {ID: props.ID},
   [data,setData] = useState({}),
   [movieId,setmovieId] = useState(false),
   [overExpanded,setOverExpanded] = useState(false),
   [error ,setError] = useState(''),
   showType = props.type ? props.type : 'movie' ;

  useEffect( () => {
     console.log(ID ," : ID", showType , ' : showType');
     axios.get(`https://api.themoviedb.org/3/${showType}/${ID}?api_key=231423fc80b78690e4e5f233f191b78b`).then( (response) => {setData(response.data);setError('')})
     .catch( (e) => {setError('Oops! Something went wrong. Try again..')});

   },[ID]);

   // function that toggles the visibitiy of the trailer video frame by updating a state variable that allow to include the video frame conditionally into the Dom
   var videoToggler = (e) => {
     (e.target.className === "video-box ") && setmovieId(false);

    };

   // EvantHanling Function
   useEffect (function(){
     // set the click evant to toggle down the display of the video trailer component
     movieId !== false && document.addEventListener('click',videoToggler);
    // remove the event Listener
      return () => document.removeEventListener('click',videoToggler);
    },[movieId])


  return (
    <div className="detail"   style={{
    backgroundImage: `linear-gradient(rgba(40, 44, 52, 0.9), rgba(40, 44, 52, 1)), url('https://image.tmdb.org/t/p/w500/${data.backdrop_path}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }}>

      <NavigateBack pageName={data.original_title ? "Movie" : "TV Show"} />

      {data.id !== undefined ? <>

        <div className="detail-head row ">
          <img className="detail-poster col " src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="" />
          <InfoLabel className='inactive col' itm={data} ind={10} setmovieId={setmovieId} overviewLimit={overExpanded ? 3000 : 200} titleLimit={100} setOverExpanded={setOverExpanded} overExpanded={overExpanded}>

              <a href={data.homepage}target='parrent'><button type="button" className=' btn-detail'> <FontAwesomeIcon className="pr-5" icon={faLink} />WEBSITE</button></a>
              <p className='s-para mt-4'><span className='overview-title'>Genre: </span>{data.genres && (data.genres.map((obj) => {return obj.name})).join(', ')}.</p>
              <ReadMore setOverExpanded={setOverExpanded} overExpanded={overExpanded}/>
          </InfoLabel>
        </div>

        {props.children}

        <MovieContainer id="cast" endpoint={`${showType}/${ID}/credits`} placeholder="No available cast.."><p className="section-title">Cast</p><CastProfile /></MovieContainer>

        <MovieContainer id="review" endpoint={`${showType}/${ID}/reviews`} placeholder="No cast available.."><p className="section-title">Reviews</p><ReviewBox /></MovieContainer>

        <MovieContainer id="related" endpoint={`${showType}/${ID}/similar`} type={showType}><p className="section-title">Related </p><MovieBox /></MovieContainer>

        {movieId !== false &&  <VideoTrailer className="" Id={movieId}/>}
        {data.id && (document.querySelector('.detail-head') !== null) && (document.querySelector('.detail-head').style.display = (movieId ? 'none' : ''))}
        {/*movieId !== false && EvantHanling()*/}
      </>
      : <div className='d-flex justify-content-center align-items-center vh-100 mb-150' > {error.length === 0 ? <div className="spinner-border" id="spinner" role="status"><span className="sr-only">Loading...</span></div>
      : <ErrorPannel imgPath='/offline.svg' message={error}/>}</div>}
    </div>
  )


})
// {/*movieId !== false && EvantHanling()*/}
