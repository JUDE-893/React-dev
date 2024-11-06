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
          <button className="btn btn-github" type="button" name="button">
            <FontAwesomeIcon className="faGithub" icon={faGithub} />
            View My GitHub
          </button>
      </div>

      <div className='projects-container'>

            <div className="project-box">
              <div className='project-pannel'>
                <img src="./img/project_pannel_3.png" alt="no foto displayed!!!" />
              </div>
              <p className="project-title">TodoList</p>
              <p className='small-para'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
              <p className='project-link'><a href="#">View In GitHub</a> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> </p>
            </div>

            <div className="project-box">
              <div className='project-pannel'>
                <img src="./img/project_pannel_2.jpeg" alt="no foto displayed!!!" />
              </div>
              <p className="project-title">Budgety</p>
              <p className='small-para'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
              <p className='project-link'><a href="#">View In GitHub</a> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> </p>
            </div>

            <div className="project-box">
              <div className='project-pannel'>
                <img src="./img/project_pannel_1.png" alt="no foto displayed!!!" />
              </div>
              <p className="project-title">CountryBeans</p>
              <p className='small-para'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
              <p className='project-link'><a href="#">View In GitHub</a> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> </p>
            </div>
      </div>


    </div>
  )
})
