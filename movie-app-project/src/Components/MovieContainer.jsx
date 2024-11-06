import {memo,useState,useEffect,Children,cloneElement} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import MovieBox from './MovieBox';



export default memo( function MovieContainer(props) {

  const [data,setData] = useState([]),
  [containerTitle, childBox] = Children.toArray(props.children),
  navigate = useNavigate();


  let [tvName,setTvName] = useState();


  useEffect( () => {

     axios.get(`https://api.themoviedb.org/3/${props.endpoint}?api_key=231423fc80b78690e4e5f233f191b78b`).then( (response) => {setData(response.data.results ?? response.data.cast ?? response.data.seasons);setTvName(response.data.original_name) ;console.log('movies container : ',response.data, 'endpoint : ',props.endpoint);})
     .catch( (e) => {console.log("Error : ", e)});

   },[props.endpoint]);

   var scrollWidth = data.length * 200 -300 ,
   scrollArea = 500,

   scrollRight = function(e){
     if (scrollArea < scrollWidth) {
       scrollArea += 400;
       var Id = e.target.nodeName === 'svg' ? e.target.parentNode.parentNode.id : e.target.parentNode.parentNode.parentNode.id;
       document.querySelector(`#${Id} .movies`).scrollTo({ left: scrollArea, behavior: 'smooth' });
     }},

   scrollLeft = function(e){
     if (scrollArea > 0) {
         scrollArea -= 400;
         var Id = e.target.nodeName === 'svg' ? e.target.parentNode.parentNode.id : e.target.parentNode.parentNode.parentNode.id;
         document.querySelector(`#${Id} .movies`).scrollTo({ left: scrollArea, behavior: 'smooth' });
       }},

  handleClickMore = function (){
    let params = {type: (props.type !== 'tv' ? 'movie' : 'tv'), endpoint: props.endpoint, pageTitle:containerTitle.props.children};
    navigate('/More',{state:params})
  }


  return (
    <div id={props.id} className="movie-container">

      {containerTitle}
      {data.length > 0  ? <>
      <div className="movies">
        {data.map( (item,index) => {
          console.log(props.type);
          return cloneElement(childBox, {data :item, index:index, key:index,type:props.type, tvName: tvName} )
        })}
      </div>

      <div className='scroll-btns'>
        <FontAwesomeIcon icon={faChevronLeft} onClick={scrollLeft}/>
        <FontAwesomeIcon icon={faChevronRight} onClick={scrollRight}/>
        <button className='btn btn-outline' onClick={handleClickMore}>See more<FontAwesomeIcon style={{marginLeft:10}}icon={faChevronRight}/></button>
      </div></>
      : <p className='s-para place-holder'>Sorry No Available {props.id}</p>
    }

    </div>
  )
})

//          return <MovieBox data={item} key={index}/>
