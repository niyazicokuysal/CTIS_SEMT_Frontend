import {useNavigate, useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import "./HomePage.css";
import CreateNewProjectModal from "./CreateNewProjectModal";
import DeleteProjConfirmModal from "./DeleteProjConfirmModal";

import {
    Container,
    Row,
    Col,
    Table,
    Button,
    ProgressBar,
    Spinner,
} from "react-bootstrap";
import moment from "moment";

const HomePage = () => {
    const [loadingForAllProjects, setLoadingForAllProjects] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");

    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const now = 60;

    const [selectedProj, setSeletctedProj] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const deleteConfimrationShow = (project) => [{
        setShow: setShowDeleteConfirmation(true),
        setProj: setSeletctedProj(project)
    }];
    const closeDeleteConfirmation = () => [{
        //setReq: setSingleReqInfo([]),
        setClose: setShowDeleteConfirmation(false)
    }];

    const {pathname} = useLocation();
    const path = pathname.split("/");
    const projId = path[1];

    useEffect(() => {
        const getProjects = async () => {
            const projectsFromServer = await fetchProjects();
            setProjects(projectsFromServer);
        };

        getProjects();
    }, []);

    const addProject = async (project) => {
        setLoading(true);
        console.log(JSON.stringify(project));
        const res = await fetch("https://localhost:44335/api/project/add", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(project),
        });

        const newProjects = await fetchProjects();
        setProjects(newProjects);
        setLoading(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!name || !description) {
            alert("Please add the credentials");
            return;
        } else if (name.length > 50) {
            alert(`Project Name is ${name.length} character should be Max 50`);
            return;
        } else if (description.length > 300) {
            alert(
                `Project Name is ${description.length} character should be Max 300`
            );
            return;
        }

        addProject({name, description});
        setName("");
        setDesc("");
    };

    const deleteProject = async (id) => {
        setLoading(true);
        await fetch(`https://localhost:44335/api/project/delete?id=${id}`, {
            method: "POST",
        });
        const projectsFromServer = await fetchProjects();
        setProjects(projectsFromServer);
        setLoading(false);
    };

    const fetchProjects = async () => {
        const res = await fetch("https://localhost:44335/api/project/getall");
        const data = await res.json();

        setLoadingForAllProjects(true);
        return data;
    };

    return (
        <>
            {!loadingForAllProjects ? (
                <Spinner animation="border">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <>
                    <Container fluid className="containerM">
                        <Row>
                            <Col sm={8} className="welcome">
                                <h1 className="titleHP">Welcome Mehmet Mehmetoğlu</h1>
                            </Col>
                            <Col sm={4} style={{textAlign: "end"}}>
                                <Button
                                    size="lg"
                                    variant="warning"
                                    onClick={() => navigate("inDev")}
                                >
                                    Manage Users
                                </Button>
                                <Button
                                    size="lg"
                                    variant="success"
                                    style={{marginLeft: "20px"}}
                                    onClick={handleShow}
                                >
                                    Create New Project
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Project Id</th>
                                        <th>Project Name</th>
                                        <th>User Count</th>
                                        <th>Creation Date</th>
                                        <th>Success Rate of All Test Steps</th>
                                        <th>Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody style={{position: "relative"}}>

                                    {loading ? (
                                        <Spinner style={{
                                            position: "absolute",
                                            top: "60%",
                                            left: "50%",
                                        }} animation="grow" role="status" size={"sm8"}>
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                        <>
                                            {projects.map((project) => (
                                                <tr
                                                    key={project.id}
                                                    onClick={() => navigate(`${project.id}/main`)}
                                                    className="tableRow"
                                                >
                                                    <td className="tableCol" style={{width: "150px"}}>
                                                        {project.id}
                                                    </td>
                                                    <td className="tableCol">{project.name}</td>
                                                    <td className="tableCol" style={{width: "150px"}}>
                                                        12323
                                                    </td>
                                                    <td className="tableCol" style={{width: "430px"}}>
                                                        {moment(project.createdDate).format("LLLL")}
                                                    </td>
                                                    <td
                                                        className="tableCol"
                                                        style={{width: "500px", paddingTop: "14px"}}
                                                    >
                                                        <ProgressBar now={project.finishRate}
                                                                     label={`${parseFloat(project.finishRate).toFixed(2)}%`}/>
                                                    </td>
                                                    <td
                                                        onClick={(e) => e.stopPropagation()}
                                                        id="deleteColumn"
                                                        style={{width: "157px"}}
                                                    >
                                                        <Button
                                                            size="sm"
                                                            variant="danger"
                                                            className="btnDelete"
                                                            onClick={() => deleteConfimrationShow(project)}
                                                        >
                                                            Delete the Project
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}
                                    </tbody>


                                </Table>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}></Col>
                            <Col sm={6}></Col>
                        </Row>
                    </Container>
                </>
            )}

            <CreateNewProjectModal
                show={show}
                handleClose={handleClose}
                onSubmit={onSubmit}
                name={name}
                setName={setName}
                description={description}
                setDesc={setDesc}
            ></CreateNewProjectModal>

            {<DeleteProjConfirmModal
                showDeleteConfirmation={showDeleteConfirmation}
                closeDeleteConfirmation={closeDeleteConfirmation}
                project={selectedProj}
                deleteProject={deleteProject}
            ></DeleteProjConfirmModal>}
        </>
    );
};

export default HomePage;
