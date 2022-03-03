import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import './HomePage.css'

const HomePage = () => {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        const getProjects = async () => {
          const projectsFromServer = await fetchProjects()
          setProjects(projectsFromServer)
        }
        
        getProjects()
      }, [])

    const fetchProjects = async () => {
        const res = await fetch('https://localhost:44335/api/project/getall')
        const data = await res.json()
    
        return data
      }

    return (
        <div>
            <h1 className="titleHP">Welcome To</h1>
            <h1 className="titleHP">Cey Defence Software Engineering Management Tool</h1>
            <h1 className="titleHP">(SEMT)</h1>
            <h1 className="titleHP">Project Demo by Team Teletubbies</h1>
            {console.log(projects)}
            <ul className="projectsList">
                {projects.map((project) =>(
                    <li key={project.id} style={{listStyleType: "none"}}><Link className="projectsListItems" to={`${project.id}/main`}>{project.name}</Link></li>
                ))}
            </ul> 
        </div>
    )
}

export default HomePage
