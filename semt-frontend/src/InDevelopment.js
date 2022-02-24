import { Link , useNavigate} from "react-router-dom"

const InDevelopment = () => {

    const navigate = useNavigate()
    return (
        <div style={{textAlign: "center"}}>
            <h1>In Development</h1>
            {/* <Link to="/0001/main">Go Back</Link> */}
            <button onClick={(() => navigate(-1))}> Go Back</button>
        </div>
    )
}

export default InDevelopment
