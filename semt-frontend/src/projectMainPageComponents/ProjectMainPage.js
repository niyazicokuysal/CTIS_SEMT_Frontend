import { Link } from "react-router-dom"
import './ProjectMainPage.css'
import { useLocation } from "react-router-dom"
import { useState , useEffect} from "react"


const ProjectMainPage = ({ dummyProject }) => {

    const [project, setProject] = useState([])

    const {pathname} = useLocation()
    const path = pathname.split("/")
    const projId = path[1]

    useEffect(() => {
        const getProject = async () => {
            const projectInfo = await fetchProject(projId)
            setProject(projectInfo)
        }
        
        getProject()
      }, [])

    const fetchProject = async (id) => {
        const res = await fetch(`https://localhost:44335/api/project/getbyid?id=${id}`)
        const data = await res.json()
    
        return data
      }
    

    return (
        <div className="projectMainPage">
            <div className="projectMainPageHeader">
                <h1 style={{paddingRight: "300px"}}>{project.name}</h1>
                <Link to={"/inDev"} style={{margin: "0px"}}> <button style={{marginLeft:"400px",  background: "#f46e0f"}}>Create Base Line </button> </Link>
                <Link to={"/inDev"} style={{margin: "0px"}}> <button style={{background: "#2f7509"}}>Edit</button> </Link>
                <Link to={"/inDev"} style={{margin: "0px"}}> <button style={{background: "#a60a0a"}}>Delete</button> </Link>
            </div>
            <a>{project.description}</a>
            <h3>Previous Versions</h3>
            <ul>
                {dummyProject.version_ids.map((version) =>(
                    <li key={version}><Link to={"/inDev"} className="projectMainPageList">{"version_" +  projId + "_" + version}</Link></li>
                ))}
            </ul>
            <h3 style={{marginTop: "80px"}}>Project Members</h3>
            <ul>
                {dummyProject.members.map((member, i) =>(
                    <li key={i}><Link to={"/inDev"} className="projectMainPageList">{member}</Link></li>
                ))}
            </ul>
            <Link to={"/inDev"} style={{margin: "0px"}}> <button className="addMemberBtn">Add Project Member</button> </Link>
          
        </div>
    )
}

ProjectMainPage.defaultProps = {
    dummyProject: {
        id: "0001",
        name: "Bilkent_Mobile_App",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        version_ids: ["_0.1v", "_0.2v" , "_0.3v"],
        members: ["Memhmet Ali - Project Menager", "Tahsin Küçük - Developer", "Burak Demirbaş - Developer", "Zeynep Zeynep Oğlu - Tester", "Deniz Tuzlu - Tester"] 
    }
}


export default ProjectMainPage
