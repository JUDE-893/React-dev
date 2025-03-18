import {memo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';



export default function ProjectsContainer({data,title,stack}) {
  let poster = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOiFAU53OLaj1FAW02RbTiL0zs-dW6f19AQw&s';

  return (
    <div className="portfolio-section" id='testimonials'>
      <p className="Section-title">{stack}</p>
      <p className='Section-big-title' style={{marginBottom: 50}}>{title}</p>

      <div className='projects-container'>
            {data && data.map( (proj) =>
              <div className="project-box">
              {console.log('proj', proj)}
              <div className='project-pannel'>
                <img src={proj.poster ? proj.poster : poster} alt="no foto displayed!!!" />
              </div>
              <p className="project-title">{proj?.title}</p>
              <p className='small-para'>{proj?.description}</p>
              <span style={{display:'flex'}}>
                {proj?.github && <p className='project-link'><a href={proj?.github} target="_blank">View On GitHub</a> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> </p>}
                {proj?.link && <p className='project-link' style={{marginLeft:'auto'}}><a href={proj.link} target="_blank">Live Preview</a> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> </p>}
              </span>
            </div>)}
      </div>
    </div>)
}
