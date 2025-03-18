import {createContext, useContext, useEffect,useState} from 'react'



const ProjectsContext = createContext();

export default function ProjectsProvider({children}) {
  const [projects, setProjects] = useState({});

  useEffect(() => {
   fetch('/data/projects.json') // Adjust the path to your file location
     .then((response) => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.json();
     })
     .then((jsonData) => setProjects(jsonData))
     .catch((error) => console.error('Error fetching the JSON file:', error));
 }, []);

  // get a single roject object by stack (e.g "React") and ind
  const getUniqueProject = (stack,ind) => {
    return projects[stack][ind]
  }

  return (
    <ProjectsContext.Provider value={{projects,getUniqueProject}}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  const context  = useContext(ProjectsContext);
  if (!context) throw new Error('useProject Hook was used outside of its provider scoop');
  return context;
}
