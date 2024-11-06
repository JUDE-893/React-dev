import {memo,useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay,faStar} from "@fortawesome/free-solid-svg-icons";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import VideoTrailer from './VideoTrailer';
import InfoLabel from './InfoLabel';



export default memo(function MovieCarousel(props) {

  const [data,setData] = useState([]);
  const [movieId,setmovieId] = useState(false);

  useEffect( () => {

     axios.get(`https://api.themoviedb.org/3/${props.endpoint}?api_key=231423fc80b78690e4e5f233f191b78b`).then( (response) => {setData(response.data.results);console.log('data carousel: ', response.data.results)})
     .catch( (e) => {console.log("Error : ", e)});

   },[]);

    // function that determine the group of an index and return the it minimum and the maximum number
    var groupPattern = function(n,n2) {
      let p=5,
      partes = Math.floor(n / p);

      for ( let i = 1; i <= partes; i++) {
        if(i*p >= n2 && (i-1)*p <= n2){
          return {min :((i-1)*5),max : i*5}
        }
      }
    };

   // fnction that handle carousel's Indicators : show group of 10 indicator per time
    var handleIndicators = function() {

        var indics = document.querySelectorAll('.carousel-indicators li'),
        currentIndex = document.querySelector('.carousel-indicators .active').id ?? 0;
        const {min,max} = groupPattern(indics.length,currentIndex)

        let passed = (indics ?? []).forEach( (li,index) => {
          li.style.display = index < max && index >= min ? 'block' : 'none' ;
        });
    };

    var EvantHanling = function(){

      // set the carrousel' indicator handler evants
      document.getElementById('myCarousel').addEventListener('slid.bs.carousel', function () {
          // currentIndex = (currentIndex + 5) % totalIndicators;
          handleIndicators();
      });

      // set the click evant to toggle down the display of the video trailer component
      document.addEventListener('click',(e) => {
        movieId && (e.target.className === "video-box ") && setmovieId(false);
      })
    };


   return (
     <div className="container-lg my-3">
        <div id="myCarousel" className="carousel slide" data-bs-ride="">
            <ol className="carousel-indicators">

              {data.map( (it, ind) => {
                return (<li data-bs-target="#myCarousel" data-bs-slide-to={ind} id={ind} className={ind === 0 ? "active" : ""} style={{display : ind >=5 ? 'none' : 'block'}}></li>);
              })}

            </ol>

            <div className="carousel-inner">
                {data.map( (itm, ind) => {
                  return (
                    <InfoLabel className='carousel-item' itm={itm} ind={ind} setmovieId={setmovieId} overviewLimit={140} titleLimit={28}>
                      <Link to={`/detail/${itm.id}`} >
                        <button type="button" className=' btn-detail'>More Details</button>
                      </Link>
                    </InfoLabel>

                  );
                })}

            </div>

            <a className="carousel-control-prev" href="#myCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#myCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
            </a>
        </div>
        {movieId && <VideoTrailer className={movieId ? "" : "hidden-video-box"} Id={movieId}/>}
        { (data.length > 0) && EvantHanling()}
    </div>
   )

})
