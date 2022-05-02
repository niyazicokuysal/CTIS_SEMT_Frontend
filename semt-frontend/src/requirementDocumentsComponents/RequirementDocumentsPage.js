import "./RequirementDocumentsPage.css";
import {Link, useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import EditReqDocumentInfoModal from "./EditReqDocumentInfoModal";
import AddRequirementInDocumentModal from "./AddRequirementInDocumentModal";
import EditRequirementModal from "./EditRequirementModal";
import AddRequirGroupModal from "./AddRequirGroupModal";
import ViewReqDetailsModal from "./ViewReqDetailsModal";
import Switch from "react-js-switch";
import {
    Container,
    Row,
    Col,
    Table,
    Button,
    ProgressBar,
    Breadcrumb,
    Spinner,
} from "react-bootstrap";

const RequirementDocumentsPage = () => {
    const [loading, setLoading] = useState(true);
    const [loadingForProject, setLoadingForProject] = useState(false);
    const [loadingForDocument, setLoadingForDocument] = useState(false);
    const [listById, setListById] = useState(true);
    const [project, setProject] = useState([]);
    const [document, setDocument] = useState([]);
    const [docGroups, setDocGroups] = useState([]);
    const [docRequirements, setDocumentRequirements] = useState([]);
    const [singleReqInfo, setSingleReqInfo] = useState([]);
    const [singleGroupInfo, setSingleGroupInfo] = useState([null]);
    const [reqHistory, setReqHistory] = useState("");
    const [loadingForReq, setLoadingForReq] = useState(false);
    const [loadingForReqHistory, setLoadingForReqHistory] = useState(false);
    const [showReqHistory, setShowReqHistory] = useState(false);

    const [showDetails, setDetails] = useState(false);
    const [showDoc, setDoc] = useState(false);
    const [showGroup, setGroup] = useState(false);
    const [showReq, setReq] = useState(false);
    const [showUpdateReq, setUpdateReq] = useState(false);

    const [docTypeName, setDocTypeName] = useState("");
    const [docDescription, setDocDesc] = useState("");

    const [reqComment, setReqComment] = useState("");
    const [reqDesc, setReqDesc] = useState("");
    const [reqGrp, setReqGrp] = useState(null);
    const [reqType, setReqType] = useState("");
    const [reqId, setReqId] = useState("");


    const [groupName, setGroupName] = useState("");

    const {pathname} = useLocation();
    const path = pathname.split("/");
    const projId = path[1];
    const docId = path[3];

    const docClose = () => setDoc(false);
    const docShow = () => setDoc(true);

    const detailsClose = () => [
        {
            set: setDetails(false),
            setLoadReq: setLoadingForReq(false),
            setLoadHistory: setLoadingForReqHistory(false),
            setShowReqHistory: setShowReqHistory(false),
            test: console.log("On close, reqloading:", loadingForReq, " showhist", showReqHistory)
        },
    ];
    const detailsShow = (id, group, reqName) => [
        {
            set: setDetails(true),
            showedReqId: id,
            req: getReqById(id),
            //group: getGroupById(group),
            //history: getReqHistory(reqName)
        },
    ];

    const loadReqHistory = (reqName) => [
        {
            set: setShowReqHistory(true),
            history: getReqHistory(reqName)
        },
    ];

    const groupClose = () => setGroup(false);
    const groupShow = () => setGroup(true);

    const reqClose = () => setReq(false);
    const reqShow = () => setReq(true);
    const updateReqClose = () => setUpdateReq(false);
    const updateReqShow = (id, reqType, reqDesc, reqComment, reqGrp) => [
        {
            setReqGrp: setReqGrp(reqGrp),
            setDesc: setReqDesc(reqDesc),
            setComment: setReqComment(reqComment),
            setType: setReqType(reqType),
            set: setUpdateReq(true),
            setReqId: setReqId(id),
        },
    ];

    useEffect(() => {
        const getProject = async () => {
            const projectInfo = await fetchProject(projId);
            setProject(projectInfo);
        };

        const getDocument = async () => {
            const documentInfo = await fetchDocument(docId);
            setDocument(documentInfo);
        };

        const getDocGroups = async () => {
            const groupsInfo = await fetchDocumentGroups(docId);
            setDocGroups(groupsInfo);
        };

        const getDocReq = async () => {
            const docReqs = await getProjectDocumentsRequirements(docId);

            setDocumentRequirements(docReqs);
        };

        getProject();
        getDocument();
        getDocReq();
        getDocGroups();
    }, []);

    const onSubmitReq = (e) => {
        e.preventDefault();

        if (!reqComment || !reqDesc || !reqType) {
            alert("Please add the credentials");
            return;
        }


        const projectId = Number(projId);
        const requirementDocumentId = Number(docId);
        let requirementGroupId = Number(reqGrp);
        const description = reqDesc;
        const comment = reqComment;
        const testTypes = reqType;

        if (requirementGroupId == 0) {
            requirementGroupId = null;
        }

        console.log(JSON.stringify({
            projectId,
            requirementDocumentId,
            requirementGroupId,
            description,
            comment,
            testTypes,
        }));

        addRequriement({
            projectId,
            requirementDocumentId,
            requirementGroupId,
            description,
            comment,
            testTypes,
        });
        setReqComment("");
        setReqDesc("");
        setReqGrp(null);
        setReqType("");
        reqClose(false);
    };

    const onUpdateReq = (e) => {
        e.preventDefault();

        if (!reqComment || !reqDesc) {
            alert("Please add the credentials");
            return;
        }

        const id = Number(reqId);
        const projectId = Number(projId);
        const requirementDocumentId = Number(docId);
        let requirementGroupId = Number(reqGrp);
        const description = reqDesc;
        const comment = reqComment;
        const testTypes = reqType;
        if (requirementGroupId == 0) {
            requirementGroupId = null;
        }
        console.log(JSON.stringify({
            id,
            projectId,
            requirementDocumentId,
            requirementGroupId,
            description,
            comment,
            testTypes,
        }));
        updateRequriement({
            id,
            projectId,
            requirementDocumentId,
            requirementGroupId,
            description,
            comment,
            testTypes,
        });
        setReqId("");
        setReqComment("");
        setReqDesc("");
        setReqGrp(null);
        setReqType("");
        setUpdateReq(false);
    };

    const addRequriement = async (reqInfo) => {
        setLoading(false);
        console.log(JSON.stringify(reqInfo));
        const res = await fetch("https://localhost:44335/api/requirement/add", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(reqInfo),
        });

        const newRequirements = await getProjectDocumentsRequirements(docId);
        setDocumentRequirements(newRequirements);
        setLoading(true);
    };

    const updateRequriement = async (reqInfo) => {
        setLoading(false);
        console.log(JSON.stringify(reqInfo));
        const res = await fetch("https://localhost:44335/api/requirement/update", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(reqInfo),
        });

        const newRequirements = await getProjectDocumentsRequirements(docId);
        setDocumentRequirements(newRequirements);
        setLoading(true);
    };

    const onSubmitGroup = (e) => {
        e.preventDefault();

        if (!groupName) {
            alert("Please add the credentials");
            return;
        }

        const name = groupName;
        const requirementDocumentId = document.id;
        const parentId = null;
        addDocumentReqGroup({parentId, requirementDocumentId, name});
        setGroup("");
        docClose(false);
    };

    const addDocumentReqGroup = async (groupInfo) => {
        setLoading(false);
        console.log(JSON.stringify(groupInfo));
        const res = await fetch(
            "https://localhost:44335/api/requirement-group/add",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(groupInfo),
            }
        );

        const newdocs = await fetchDocumentGroups(docId);
        setDocGroups(newdocs);
        setLoading(true);
    };

    const onUpdateDocument = (e) => {
        e.preventDefault();

        if (!docTypeName || !docDescription) {
            alert("Please add the credentials");
            return;
        }

        document.typeName = docTypeName + " Requirements Document";
        document.description = docDescription;
        console.log(document);
        updateDocument(document);
        setDocTypeName("");
        setDocDesc("");
        setDoc(false);

    };

    const deleteRequirement = async (id) => {
        setLoading(false);

        await fetch(`https://localhost:44335/api/requirement/delete?id=${id}`, {
            method: "POST",
        });
        const docReqs = await getProjectDocumentsRequirements(docId);
        setDocumentRequirements(docReqs);
        setLoading(true);

    };

    const fetchDocumentGroups = async (id) => {
        const res = await fetch(
            `https://localhost:44335/api/requirement-group/getall?documentId=${id}`
        );
        const data = await res.json();

        return data;
    };

    const fetchProject = async (id) => {
        const res = await fetch(
            `https://localhost:44335/api/project/getbyid?id=${id}`
        );
        const data = await res.json();

        setLoadingForProject(true);
        return data;
    };

    const getProjectDocumentsRequirements = async (id) => {
        const res = await fetch(
            `https://localhost:44335/api/requirement/getbydocumentid?documentId=${id}`
        );
        const data = await res.json();

        console.log(data);
        return data;
    };

    const getReqById = async (id) => {
        const res = await fetch(
            `https://localhost:44335/api/requirement/getbyid?id=${id}`
        );
        const data = await res.json();

        const projectInfo = data;
        setSingleReqInfo(projectInfo);
        setLoadingForReq(true);
        return data;
    };

    const getGroupById = async (id) => {
        if (id !== null) {
            const res = await fetch(
                `https://localhost:44335/api/requirement-group/getbyid?id=${id}`
            );
            const groupInfo = await res.json();
            setSingleGroupInfo(groupInfo);
        } else setSingleGroupInfo(null);
    };

    const getReqHistory = async (reqName) => {
        if (!loadingForReqHistory) {
            console.log("making request for ", reqName + "...")
            const res = await fetch(
                `https://localhost:44335/api/requirement/history?projectId=${projId}&name=${reqName}`
            );
            const data = await res.json();

            const tempreqHistory = data;
            setReqHistory(tempreqHistory);
            setLoadingForReqHistory(true);
            return data;
        }
    }

    const fetchDocument = async (id) => {
        const res = await fetch(
            `https://localhost:44335/api/requirement-document/getbyid?id=${id}`
        );
        const data = await res.json();

        setLoadingForDocument(true);
        return data;
    };

    const updateDocument = async (document) => {
        setLoading(true);
        console.log(JSON.stringify(document));
        const res = await fetch(
            "https://localhost:44335/api/requirement-document/update",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(document),
            }
        );

        const newDocument = await fetchDocument(document.id);
        setDocument(newDocument);
        setLoading(false);
    };

    const renderNullGroup = () => {
        let isNull = false;
        for (let i = 0; i < docRequirements.length; i++) {
            if (docRequirements[i].requirementGroupId == null || docRequirements[i].requirementGroupId == 0) isNull = true;
        }
        if (isNull) {
            return (
                <>
                    <tr className="header">
                        <td colSpan="8">No Group</td>
                    </tr>
                    {docRequirements.map((requirement, i) =>
                        renderGroupRequirements({id: null}, requirement, i)
                    )}
                </>
            );
        }
    };

    const renderGroupRequirements = (group, requirement, i) => {
        if (group.id == requirement.requirementGroupId) {
            return (
                renderReq(requirement, i)
            );
        }
        return null;
    };

    const renderReq = (requirement, i) => {
        return (
            <tr
                key={i}
                className={`${requirement.isDeleted === true ? "deleted" : ""}`}
            >
                <td>{requirement.name}</td>

                <td>{requirement.description}</td>
                <td>{requirement.testTypes}</td>
                <td>{requirement.isDeleted === true ? "Deleted" : "Not Deleted"}</td>
                <td className={`${false === true ? "trueRow" : "falseRow"}`}>No</td>
                <td>
                    <Button
                        size="sm"
                        variant="primary"
                        className="btnTable"
                        onClick={() =>
                            detailsShow(requirement.id, requirement.requirementGroupId, requirement.name)
                        }
                    >
                        View
                    </Button>
                </td>
                <td>
                    <Button
                        size="sm"
                        variant="info"
                        onClick={() =>
                            updateReqShow(requirement.id, requirement.testTypes, requirement.description, requirement.comment, requirement.requirementGroupId)}
                        className="btnTable"
                    >
                        Edit
                    </Button>
                </td>
                <td>
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteRequirement(requirement.id)}
                        className={`${
                            requirement.isDeleted === true ? "deletedBtn" : "btnTable"
                        }`}
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        );
    }

    const renderById = () => {
        return (
            <>
                {docRequirements.map((requirement, i) => (
                    renderReq(requirement, i)
                ))}
            </>
        );
    }

    return (
        <>
            {(!loadingForProject && !loadingForDocument) ? (
                <Spinner animation="border">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <>
                    <Container fluid className="reqDocMainPage">
                        <Row>
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                    <Link to={`${"/"}`}>Main Page</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to={`${"/" + projId + "/main"}`}>{project.name}</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>{document.typeName}</Breadcrumb.Item>
                            </Breadcrumb>
                            <Col sm={8} style={{height: "140px"}}>
                                <Row className="projInfoRow">
                                    <Col className="progressBar">
                                        {" "}
                                        <ProgressBar
                                            now={document.finishRate}
                                            label={`Verification Rate of the Requirements: ${parseFloat(document.finishRate).toFixed(2)}%`}
                                        />
                                    </Col>
                                </Row>
                                <Row className="projInfoRow">
                                    <Col className="projectReqDesc">
                                        <a>{document.description}</a>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={2}>
                                <Button
                                    size="lg"
                                    variant="info"
                                    className="btnReqDoc"
                                    onClick={docShow}
                                    disabled={!loading}

                                >
                                    Edit Document Info
                                </Button>
                                <Button
                                    size="lg"
                                    variant="success"
                                    className="btnReqDoc"
                                    onClick={reqShow}
                                    disabled={!loading}
                                >
                                    Add Requirement in Document
                                </Button>
                            </Col>
                            <Col sm={2}>
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="btnReqDoc"
                                    onClick={groupShow}
                                    disabled={!loading}

                                >
                                    Add Requirements Group
                                </Button>
                                <Button
                                    size="lg"
                                    variant="dark"
                                    className="btnReqDoc"
                                    /*onClick={() => {
                                        console.log(docGroups)
                                    }}*/
                                    disabled={!loading}

                                >
                                    Create Baseline of Document
                                </Button>
                            </Col>
                        </Row>
                        <Row className="tableSwitch">
                            <Col sm={2} style={{paddingBottom: "10px"}}>
                                <h5>List By Group/List By Req Id:</h5>
                            </Col>
                            <Col>
                                <Switch
                                    borderColor={{on: "#f46e0f", off: "#f9f9f9"}}
                                    backgroundColor={{on: "#f46e0f", off: "#D0CDC8"}}
                                    color="#E3E3E3"
                                    value={listById}
                                    size={60}
                                    onChange={() => {
                                        listById == false ? (
                                            setListById(true)
                                        ) : (setListById(false))
                                    }
                                    }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table hover bordered className="reqTable">
                                    <thead>
                                    <tr>
                                        <th style={{width: "140px"}}>Req Id</th>
                                        <th>Description</th>
                                        <th style={{width: "170px"}}>Test Types</th>
                                        <th style={{width: "120px"}}>Is Deleted</th>
                                        <th style={{width: "105px"}}>Is Verified</th>
                                        <th style={{width: "118px"}}>View Details</th>
                                        <th style={{width: "118px"}}>Edit</th>
                                        <th style={{width: "118px"}}>Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody style={{position: "relative"}}>
                                    <>
                                        {!loading ? (
                                            <Spinner style={{
                                                position: "absolute",
                                                top: "100%",
                                                left: "50%",
                                            }} animation="grow" role="status" size={"sm8"}>
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        ) : (
                                            <>
                                                {listById === false ? (
                                                    <>
                                                        {renderById()}
                                                    </>
                                                ) : (
                                                    <>
                                                        {renderNullGroup()}
                                                        {docGroups.map((group, g) => (
                                                            <>
                                                                <tr className="header">
                                                                    <td colSpan="8">{group.name}</td>
                                                                </tr>
                                                                {docRequirements.map((requirement, i) =>
                                                                    renderGroupRequirements(group, requirement, i)
                                                                )}
                                                            </>
                                                        ))}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>

                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <div style={{height: "100px"}}></div>
                    </Container>
                </>
            )}

            <EditReqDocumentInfoModal
                showDoc={showDoc}
                docClose={docClose}
                onUpdateDocument={onUpdateDocument}
                setDocTypeName={setDocTypeName}
                setDocDesc={setDocDesc}
                docName={document.header}
                docDesc={document.description}
            ></EditReqDocumentInfoModal>

            <AddRequirementInDocumentModal
                showReq={showReq}
                reqClose={reqClose}
                onSubmitReq={onSubmitReq}
                setReqDesc={setReqDesc}
                setReqComment={setReqComment}
                setReqType={setReqType}
                setReqGrp={setReqGrp}
                docGroups={docGroups}
            ></AddRequirementInDocumentModal>

            <EditRequirementModal
                showUpdateReq={showUpdateReq}
                updateReqClose={updateReqClose}
                onUpdateReq={onUpdateReq}
                setReqDesc={setReqDesc}
                setReqComment={setReqComment}
                setReqType={setReqType}
                setReqGrp={setReqGrp}
                docGroups={docGroups}
                reqGrp={reqGrp}
                reqDesc={reqDesc}
                reqComment={reqComment}
                reqType={reqType}
            ></EditRequirementModal>

            <AddRequirGroupModal
                showGroup={showGroup}
                groupClose={groupClose}
                onSubmitGroup={onSubmitGroup}
                setGroupName={setGroupName}
            ></AddRequirGroupModal>

            <ViewReqDetailsModal
                showDetails={showDetails}
                detailsClose={detailsClose}
                singleReqInfo={singleReqInfo}
                singleGroupInfo={singleGroupInfo}
                reqHistory={reqHistory}
                getReqHistory={getReqHistory}
                loadingForReq={loadingForReq}
                setLoadingForReqHistory={setLoadingForReqHistory}
                showReqHistory={showReqHistory}
                loadingForReqHistory={loadingForReqHistory}
                setShowReqHistory={setShowReqHistory}
                loadReqHistory={loadReqHistory}
                docGroups={docGroups}
            ></ViewReqDetailsModal>
        </>
    );
};

export default RequirementDocumentsPage;
