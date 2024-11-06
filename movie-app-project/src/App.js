import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import NavBar from "./Components/NavBar";
import SearchBar from "./Components/SearchBar";
import Menu from "./Components/Menu";
import Home from "./Components/Home";
import TvDetail from "./Components/TvDetail";
import CastProfileDetail from "./Components/CastProfileDetail";
import SeasonDetail from "./Components/TvDetail/SeasonDetail";
import EpisodeDetails from "./Components/TvDetail/EpisodeDetails";
import DetailsInfo from "./Components/DetailsInfo";
import Discover from "./Components/Movies&TvShows";
import FindMovie from "./Components/FindMovies";

function App() {

  const [date,setData] = useState([]),
  [searchTerm,setSearchTerm] = useState(""),
  [searching,setSearching] = useState(false),
  [menuReduced,setMenuReduced] = useState(false);


  var getSearchInfo = (info,value) => {

     if(info === "term") {
       value !== searchTerm && setSearchTerm(value);
     }
     else if(info === "searching") {
       value !== searching && setSearching(value);
     }else{
       menuReduced ? setMenuReduced(false) : setMenuReduced(true);
     }
   };

  useEffect( () => {
     // // let res = axios.get(`http://www.omdbapi.com/?s=${'fight club'}&apikey=80c4c657`).then( (response) => {console.log(response.data);});
     // let res = axios.get(`https://api.themoviedb.org/3/search/movie?api_key=231423fc80b78690e4e5f233f191b78b&query=${encodeURIComponent("openheimer")}`).then( (response) => {})
     // .catch( (e) => {console.log("Error : ", e)});

   },[searchTerm])

  return (
    <>

      {console.log("Searching : ",searching)}
    <Router>
      <NavBar searching={searching} getSearchInfo={getSearchInfo}><SearchBar getSearchInfo={getSearchInfo} /></NavBar>
      <div className="main">
        <Menu menuReduced={menuReduced}/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Movies" element={<Discover type='movie' pageName="Movies" />}/>
          <Route path="/TvShows" element={<Discover type="tv" pageName="Tv Shows" />}/>
          <Route path="/More" element={<Discover pageName="Movieo" />}/>
          <Route path="/Favorite" element={<FindMovie pageName="Favorite" />}/>
          <Route path="/search" element={<FindMovie query={searchTerm} pageName="search" />}/>
          <Route path="/detail/:ID" element={<DetailsInfo />}/>
          <Route path="/tvdetail/:ID" element={<TvDetail />}/>
          <Route path="/tvdetail/:about/:ID/season/:seasonID" element={<SeasonDetail />}/>
          <Route path="/tvdetail/:about/:ID/:season/:seasonID/episode/:episodeID" element={<EpisodeDetails />}/>
          <Route path="/person/:about/:ID" element={<CastProfileDetail />}/>
        </Routes>
      </div>
    </Router>

    </>
  )
}

export default App;
