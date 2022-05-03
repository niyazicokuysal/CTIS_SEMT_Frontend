import {Link, useNavigate} from "react-router-dom";
import "./ProjectMainPage.css";
import {useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import EditProjectInfoModal from "./EditProjectInfoModal";
import AddProjectDocumentationModal from "./AddProjectDocumentationModal";
import {
    Container,
    Row,
    Col,
    Table,
    Button,
    ListGroup,
    ProgressBar,
    Breadcrumb,
    Spinner,
    Dropdown,
} from "react-bootstrap";

const ProjectMainPage = ({dummyProject}) => {
    const [loadingForProjects, setLoadingForProjects] = useState(false);
    const [loadingForProjectsReqDocs, setLoadingForProjectsReqDocs] = useState(false);
    const [loading, setLoading] = useState(false);

    const [project, setProject] = useState([]);
    const [projectReqDocs, setProjectReqDocs] = useState([]);

    const [show, setShow] = useState(false);
    const [showDoc, setDoc] = useState(false);

    const [name, setName] = useState("");
    const [description, setDesc] = useState("");

    const [newDocName, setNewDocName] = useState("");
    const [newDocHeader, setNewDocHeader] = useState("");
    const [newDocParent, setNewDocParent] = useState("null");

    const {pathname} = useLocation();
    const path = pathname.split("/");
    const projId = path[1];

    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const docClose = () => setDoc(false);
    const docShow = () => setDoc(true);

    const now = 60;

    useEffect(() => {
        const getProject = async () => {
            const projectInfo = await fetchProject(projId);
            setProject(projectInfo);
        };

        getProject();
    }, []);

    useEffect(() => {
        const getProjectAllDoc = async () => {
            const projectAllDoc = await getProjectAllDocuments(projId);
            setProjectReqDocs(projectAllDoc);
        };

        getProjectAllDoc();
    }, []);

    const getProjectAllDocuments = async (id) => {
        const res = await fetch(
            `https://localhost:44335/api/requirement-document/getall-with-test-document?projectId=${id}`
        );
        const data = await res.json();

        setLoadingForProjectsReqDocs(true);
        return data;
    };

    const addDocuments = async (docInfoo) => {
        setLoading(true);
        console.log(JSON.stringify(docInfoo));
        const res = await fetch(
            "https://localhost:44335/api/requirement-document/add",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(docInfoo),
            }
        );

        const projectAllDoc = await getProjectAllDocuments(projId);
        setProjectReqDocs(projectAllDoc);
        setLoading(false);
    };

    const fetchProject = async (id) => {
        const res = await fetch(
            `https://localhost:44335/api/project/getbyid?id=${id}`
        );
        const data = await res.json();

        setLoadingForProjects(true);
        return data;
    };

    const updateProject = async (project) => {
        console.log(JSON.stringify(project));
        const res = await fetch("https://localhost:44335/api/project/update", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(project),
        });

        const newProject = await fetchProject(projId);
        setProject(newProject);
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

        const id = Number(projId);
        updateProject({id, name, description});
        setName("");
        setDesc("");
        setShow(false);
    };

    const onSubmitDocument = (e) => {
        e.preventDefault();

        if (!newDocName || !newDocHeader) {
            alert("Please add the credentials");
            return;
        }

        const typeName = newDocName + " Requirements Document";
        const header = newDocHeader;
        const parentDocumentId = Number(newDocParent);
        const description = "Can add description via Edit Document";
        const projectId = Number(projId);
        const testDocuments = [
            {
                projectId: projectId,
                name: newDocName + " Test Document",
                description: description,
            },
        ];
        addDocuments({
            projectId,
            parentDocumentId,
            typeName,
            header,
            description,
            testDocuments,
        });
        setNewDocName("");
        setNewDocHeader("");
        setNewDocParent("null");
        docClose(false);
    };

    return (
        <>
            {!loadingForProjects && !loadingForProjectsReqDocs ? (
                <Spinner animation="border">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <>
                    <Container fluid className="projectMainPage">
                        <Row>
                            <Col sm={10} style={{height: "200px"}}>
                                <Row className="projInfoRow">
                                    <Breadcrumb>
                                        <Breadcrumb.Item>
                                            <Link to={`${"/"}`}>Main Page</Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item active>{project.name}</Breadcrumb.Item>
                                    </Breadcrumb>
                                    <Col sm={5}>
                                        <h1>
                                            {`${project.name}`.length > 30
                                                ? `${project.name}`.slice(0, 27).concat("...")
                                                : `${project.name}`}
                                        </h1>
                                    </Col>
                                    <Col sm={7} className="progressBar">
                                        {" "}
                                        <ProgressBar now={project.finishRate}
                                                     label={`Success Rate of the ALL Test Steps: ${parseFloat(project.finishRate).toFixed(2)}%`}/>
                                    </Col>
                                </Row>
                                <Row className="projInfoRow">
                                    <Col className="projectDesc">
                                        <a>{project.description}</a>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={2}>
                                <Button
                                    size="lg"
                                    variant="info"
                                    className="btnProjectMain"
                                    onClick={handleShow}
                                    disabled={loading}
                                >
                                    Edit Project Info
                                </Button>
                                <Button
                                    size="lg"
                                    variant="success"
                                    className="btnProjectMain"
                                    onClick={docShow}
                                    disabled={loading}

                                >
                                    Add Project Documentation
                                </Button>
                                <Button
                                    size="lg"
                                    variant="warning"
                                    className="btnProjectMain"
                                    onClick={() => navigate("/inDev")}
                                    disabled={loading}

                                >
                                    Edit Project Members
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={10}>
                                <Table className="documantTable">
                                    <thead>
                                    <tr>
                                        <th style={{width: "330px"}}>
                                            Requirements Documentation
                                        </th>
                                        <th style={{width: "330px"}}>Test Documentation</th>
                                        <th>Success Rate of the Test Steps</th>
                                        <th style={{width: "250px"}}>
                                            Baselines of the Document
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody style={{position: "relative"}}>

                                    {loading ? (
                                        <Spinner style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: "50%",
                                        }} animation="grow" role="status" size={"sm8"}>
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                        <>
                                            {projectReqDocs.map((document, i) => (
                                                <tr key={i}>
                                                    <td className="documentRow">
                                                        <Link to={`/${projId}/req/${document.id}`}>
                                                            {`${document.typeName}`.length > 30
                                                                ? `${document.typeName}`
                                                                    .slice(0, 27)
                                                                    .concat("...")
                                                                : `${document.typeName}`}
                                                        </Link>
                                                    </td>
                                                    <td className="documentRow">
                                                        <Link
                                                            to={`/${projId}/test/${document.testDocument.id}`}
                                                        >
                                                            {`${document.testDocument.name}`.length > 30
                                                                ? `${document.testDocument.name}`
                                                                    .slice(0, 27)
                                                                    .concat("...")
                                                                : `${document.testDocument.name}`}
                                                        </Link>
                                                    </td>
                                                    <td style={{paddingTop: "13px"}}>
                                                        <ProgressBar now={document.finishRate}
                                                                     label={`${parseFloat(document.finishRate).toFixed(2)}%`}/>
                                                    </td>
                                                    <td>
                                                        <Dropdown>
                                                            <Dropdown.Toggle
                                                                id="dropdown-button-dark-example1"
                                                                variant="secondary"
                                                                style={{width: "233px"}}
                                                            >
                                                                Select Baseline to Go
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu
                                                                variant="dark"
                                                                style={{width: "233px"}}
                                                            >
                                                                <Dropdown.Item>
                                                                    <Link
                                                                        to={`/${projId}/reqHistory/${document.id}`}
                                                                        style={{
                                                                            textDecoration: "none",
                                                                            color: "#dee2e6"
                                                                        }}
                                                                    >
                                                                        deneme
                                                                    </Link>
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>

                                    )}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col sm={2} className="membersField">
                                <h4>Project Members</h4>
                                <ListGroup variant="flush">
                                    {dummyProject.members.map((member, i) => (
                                        <ListGroup.Item key={i}>
                                            <Link to={"/inDev"} className="projectMembers">
                                                {member}
                                            </Link>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Container>

                    <EditProjectInfoModal
                        show={show}
                        handleClose={handleClose}
                        onSubmit={onSubmit}
                        setName={setName}
                        setDesc={setDesc}
                    ></EditProjectInfoModal>

                    <AddProjectDocumentationModal
                        showDoc={showDoc}
                        docClose={docClose}
                        projectReqDocs={projectReqDocs}
                        onSubmitDocument={onSubmitDocument}
                        setNewDocName={setNewDocName}
                        setNewDocHeader={setNewDocHeader}
                        setNewDocParent={setNewDocParent}
                        reqDocuments={projectReqDocs}
                        projId={projId}
                    ></AddProjectDocumentationModal>
                </>
            )}
        </>
    );
};

ProjectMainPage.defaultProps = {
    dummyProject: {
        members: [
            "Mehmet Ali",
            "Tahsin Küçük",
            "Burak Demirbaş",
            "Zeynep Zeynep Oğlu",
            "Deniz Tuzlu",
        ],
    },
};

export default ProjectMainPage;
