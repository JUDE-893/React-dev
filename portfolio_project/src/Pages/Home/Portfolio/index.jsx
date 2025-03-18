import {useProjects} from '../../../services/ProjectsContext';
import ProjectsContainer from '../ProjectsContainer';

export default function Portfolio() {
  const {projects} = useProjects();

  return (
    <div id="portfolio">
      <p className='Section-big-title' style={{marginBottom: 220, marginTop: 120, textAlign: "center"}}>WELCOME TO MY PORTFOLIO 🎉</p>

      <ProjectsContainer data={projects['react & laravel']} stack={"Full Stack"} title={"React & Laravel"}/>
      <ProjectsContainer data={projects['react']} stack={"Front End"} title={"React"}/>
      <ProjectsContainer data={projects['nodejs']} stack={"Full Stack"} title={'NodeJs'}/>
      <ProjectsContainer data={projects['react native']} stack={"Mobile"} title={"React Native"}/>
    </div>
  )
}
