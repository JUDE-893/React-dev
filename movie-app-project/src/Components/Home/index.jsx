
import {memo} from 'react';
import MovieContainer from '../MovieContainer';
import MovieBox from '../MovieBox';
import MovieCarousel from '../MovieCarousel';


export default memo( function Home(props) {

  return (
    <div className='Home'>
      <p className='page-title'>Home</p>
      <MovieContainer id="movies-popular" endpoint='movie/popular' type=''><p className="section-title">Popular in Movies</p><MovieBox /></MovieContainer>
      <MovieContainer id="movies-upcoming" endpoint='movie/upcoming' type=''><p className="section-title">Upcoming in Movies</p><MovieBox /></MovieContainer>
      <MovieContainer id="popular-tv" endpoint='tv/popular' type='tv'><p className="section-title">Popular in Series</p><MovieBox /></MovieContainer>
      <MovieCarousel id="movies-top-rated" endpoint='movie/top_rated' type='' />
    </div>

  )
})
