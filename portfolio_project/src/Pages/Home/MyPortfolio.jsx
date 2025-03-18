import {memo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default memo(function MyPortfolio() {

  console.log("MyPortfolio");
  return (
    <div className="portfolio-section" id="portfolio">

      <p className="Section-title">Recent Projects</p>
      <div className="projects-container">
          <p className='Section-big-title'>My Portfolio</p>
          <button className="btn btn-github" type="button" name="button" onClick={() => window.open("https://github.com/JUDE-893", "_blank")}>
            <FontAwesomeIcon className="faGithub" icon={faGithub} />
            View On GitHub
          </button>
      </div>

      <div className='projects-container'>

            <div className="project-box">
              <div className='project-pannel'>
                <img src="./img/wildoasis.jpg" alt="no foto displayed!!!" />
              </div>
              <p className="project-title">The WildOasis</p>
              <p className='small-para'>A React admin dashboard app withe Supabase service.</p>
              <span style={{display:'flex'}}>
                <p className='project-link'><a href="https://github.com/JUDE-893/React-dev/tree/main/wildoasis-app-project" target="_blank">View On GitHub</a> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> </p>
                <p className='project-link' style={{marginLeft:'auto'}}><a href="https://thewildoasis-ebon.vercel.app/login" target="_blank">Live Preview</a> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> </p>
              </span>
            </div>

            <div className="project-box">
              <div className='project-pannel'>
                <img src="./img/cinemaParadiso.png" alt="no foto displayed!!!" />
              </div>
              <p className="project-title">CinemaParadiso</p>
              <p className='small-para'>Awesome React SPA movies revews with TMDB api .</p>
              <span style={{display:'flex'}}>
                <p className='project-link'><a href="https://github.com/JUDE-893/React-dev/tree/main/movie-app-project" target="_blank">View On GitHub</a> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> </p>
                <p className='project-link' style={{marginLeft:'auto'}}><a href="https://cinemaparadiso03.vercel.app/" target="_blank">Live Preview</a> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> </p>
              </span>
            </div>

            <div className="project-box">
              <div className='project-pannel'>
                <img src="./img/worldwise.png" alt="no foto displayed!!!" />
              </div>
              <p className="project-title">The WorldWise</p>
              <p className='small-para'>Useful react SPA for tracking a user trips history with Laravel REST API. </p>
              <span style={{display:'flex'}}>
                <p className='project-link'><a href="https://github.com/JUDE-893/React-dev/tree/main/wildoasis-app-project">View On GitHub</a> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> </p>
                <p className='project-link' style={{marginLeft:'auto'}}><a href="https://theworldwise.vercel.app/">Live Preview</a> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> </p>
              </span>
            </div>
      </div>


    </div>
  )
})
