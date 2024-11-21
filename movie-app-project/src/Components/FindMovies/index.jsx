import {memo,useState,useEffect} from 'react';
import axios from 'axios';
import MoviesBlockContainer from '../MoviesBlockContainer';
import Pagination from '../Pagination';
import ErrorPannel from '../ErrorPannel'

export default memo( function FindMovie(props){

  const [data, setData] = useState(false),
  [pageIndex, setPageIndex] = useState(1),
  [pages, setPages] = useState(0),
  [type, setType] = useState('movie'),
  [error,setError] = useState('');

  useEffect( () => {

     typeof props.query !== 'undefined' && axios.get(`https://api.themoviedb.org/3/search/${type}?api_key=231423fc80b78690e4e5f233f191b78b&query=${encodeURIComponent(props.query)}&page=${pageIndex}`).then( (response) => {setData(response.data.results);setPages(response.data.total_pages);setError(""); console.log('data', response.data);})
     .catch( (e) => {setError('Oops! Something went wrong. Try again')});

   },[type,pageIndex,props.query]);

   return (
     <div className="find-movies">

       <div className="find-movies-header">

         <div className="">
           <p className='page-title'>{props.pageName}</p>
           <p className='s-para'>{typeof props.query !== 'undefined' ? `Results For "${props.query}"` : "Please Sign In to access your Favorite saves We're Working on undating the authentification features. Thank you for you patience & Stay tuned!"}</p>
         </div>

         <div className="select-type">
           <p className={`page-title ${type === 'movie' ? 'active':''}`} onClick={() => setType('movie')}>Movies</p>
           <p className={`page-title ${type === 'tv' ? 'active':''}`} onClick={() => setType('tv')} >Tv Shows</p>
         </div>
       </div>
       {console.log("Error : ",typeof data)}
       { data ? <MoviesBlockContainer type={type === "tv" ? type : ''} data={data}/> : <div className='d-flex justify-content-center align-items-center vh-100' > {error.length === 0 ? <div className="spinner-border" id="spinner" role="status"><span className="sr-only">Loading...</span></div> : <ErrorPannel imgPath='/offline.svg' message={error}/>}</div> }
       { data && props.query === '' && <ErrorPannel imgPath='/search.svg' message='Waiting for you to search..'/> }
       { props.query !== '' && data.length === 0 &&  <ErrorPannel imgPath='/nothing.svg' message='No results was found!'/> }
       {pages >1 && <Pagination setPageIndex={setPageIndex} pageIndex={pageIndex} pagesIndexes={pages} />}
     </div>

   )
})
