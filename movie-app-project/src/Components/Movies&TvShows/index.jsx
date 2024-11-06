import {memo,useState,useEffect} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import MoviesBlockContainer from '../MoviesBlockContainer';
import Pagination from '../Pagination';
import NavigateBack from '../NavigateBack';
import ErrorPannel from '../ErrorPannel';


export default memo( function Discover(props) {

  const [data, setData] = useState([]),
  [genre, setGenre] = useState(false),
  [sortBy, setSortBy] = useState("rating"),
  [moviesLength, setMoviesLength] = useState(60),
  [pageIndex, setPageIndex] = useState(1),
  [pages, setPages] = useState(0),
  [error,setError] = useState(''),
  location = useLocation(),
  { type, endpoint, pageTitle } = location.state || {};

  const genres = {
    movie : [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 16, name: 'Animation' },
      { id: 35, name: 'Comedy' },
      { id: 80, name: 'Crime' },
      { id: 99, name: 'Documentary' },
      { id: 18, name: 'Drama' },
      { id: 10751, name: 'Family' },
      { id: 14, name: 'Fantasy' },
      { id: 36, name: 'History' },
      { id: 27, name: 'Horror' },
      { id: 10402, name: 'Music' },
      { id: 9648, name: 'Mystery' },
      { id: 10749, name: 'Romance' },
      { id: 878, name: 'Science Fiction' },
      { id: 10770, name: 'TV Movie' },
      { id: 53, name: 'Thriller' },
      { id: 10752, name: 'War' },
      { id: 37, name: 'Western' },
  ],
    tv : [
    { id: 10759, name: "Action & Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 10762, name: "Kids" },
    { id: 9648, name: "Mystery" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 67, name: "Talk" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" }
  ]
}



useEffect( () => {

   axios.get(`https://api.themoviedb.org/3/${endpoint}?api_key=231423fc80b78690e4e5f233f191b78b&with_genres=${genre.id ?? ""}&sort_by=${sortBy}.desc&page=${pageIndex}`).then( (response) => {setData(response.data.results);setPages(response.data.total_pages); setError('')})
   .catch( (e) => {setError('Oops! Something went wrong. Try again..')});

 },[genre.id,sortBy,moviesLength,pageIndex,location]);

  return (

    <div className="discover">

      {!props.type ? <NavigateBack pageName={pageTitle ?? "nothing"} /> : <p className='page-title'>{props.pageName}</p>}
      <div className='filter'>
          <div className="btn-group ms-3">
              <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {genre.name ?? "All"}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li className={`dropdown-item ${ genre ? '' : 'active'}`} onClick={() => setGenre(false)} >All</li>
                <div className="dropdown-submenu">
                  <li className={`dropdown-item dropdown-toggle ${ !genre ? '' : 'active'}`}>Genre</li>
                  <ul className="dropdown-menu fltr-drpd">
                    {genres[type ?? 'movie'].map( (g) => {
                      return (<li key={g.id} className={`dropdown-item ${ g.id === genre.id ? 'active' : ''}`}  onClick={() => setGenre({id : g.id,name:g.name})}>{g.name}</li>)
                    })}
                  </ul>
                </div>
              </ul>
          </div>


          <div className="btn-group">
              <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {sortBy}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li className={`dropdown-item ${ sortBy === "Title" ? 'active': ''}`} onClick={() => setSortBy('Title')} >Title</li>
                <li className={`dropdown-item ${ sortBy === 'Release Date' ? 'active': ''}`} onClick={() => setSortBy('Release Date')} >Release Date</li>
                <li className={`dropdown-item ${ sortBy === 'Rating' ? 'active': ''}`} onClick={() => setSortBy('Rating')} >Rating</li>
              </ul>
          </div>

          <div className="btn-group">
              <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {moviesLength}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li className={`dropdown-item ${ moviesLength === 60 ? 'active': ''}`} onClick={() => setMoviesLength(60)} >60</li>
              <li className={`dropdown-item ${ moviesLength === 100 ? 'active': ''}`} onClick={() => setMoviesLength(100)} >100</li>
              <li className={`dropdown-item ${ moviesLength === 160 ? 'active': ''}`} onClick={() => setMoviesLength(160)} >160</li>
              <li className={`dropdown-item ${ moviesLength === 200 ? 'active': ''}`} onClick={() => setMoviesLength(200)} >200</li>

              </ul>
          </div>

      </div>

      {data.length > 0 ? <MoviesBlockContainer type={type === 'tv' ? type : ''} data={data} />
      : <div className='d-flex justify-content-center align-items-center vh-100 mb-150' > {error.length === 0 ? <div className="spinner-border" id="spinner" role="status"><span className="sr-only">Loading...</span></div>
      : <ErrorPannel imgPath='/offline.svg' message={error}/>}</div>}

      { pages >1 && <Pagination setPageIndex={setPageIndex} pageIndex={pageIndex} pagesIndexes={pages} />}
    </div>
  )
})
