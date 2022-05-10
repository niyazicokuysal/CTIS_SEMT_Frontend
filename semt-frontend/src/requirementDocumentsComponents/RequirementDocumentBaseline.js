import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import Switch from "react-js-switch";
import {Breadcrumb, Button, Col, Container, ProgressBar, Row, Spinner, Table,} from "react-bootstrap";
import ViewBaselineReqDetailsModal from "./ViewBaselineReqDetailsModal";

const RequirementDocumentBaseline = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const path = pathname.split("/");
    const projId = path[1];
    const reqDocName = path[3];

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

    const [completionPercent, setCompletionPercent] = useState(0);

    const docId = path[3];

    const detailsClose = () => [
        {
            set: setDetails(false),
            setLoadReq: setLoadingForReq(false),
            setLoadHistory: setLoadingForReqHistory(false),
            setShowReqHistory: setShowReqHistory(false),
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


    useEffect(() => {

        const calculatePercentage = (reqs) => {
            let validated = 0.00;
            if (reqs.length > 0) {
                for (let i = 0; i < reqs.length; i++) {
                    if (reqs[i].isValidated)
                        validated++;
                }
                setCompletionPercent(validated * 100.0 / reqs.length);
            } else setCompletionPercent(0.00);
        }


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
            calculatePercentage(docReqs);
        };


        getDocReq();
        getProject();
        getDocument();
        getDocGroups();
        //calculatePercentage();
    }, []);

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

    const getReqHistory = async (reqName) => {
        if (!loadingForReqHistory) {
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
                <td className={`${requirement.isValidated === true ? "trueRow" : "falseRow"}`}>
                    {requirement.isValidated === true ? "Yes" : "No"}
                </td>
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
            {(!loadingForProject || !loadingForDocument) ? (
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
                                            variant="warning"
                                            now={completionPercent}
                                            label={`Success Rate of Requirements: ${parseFloat(completionPercent).toFixed(2)}%`}

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

                            </Col>
                            <Col sm={2}>
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="btnReqDoc"
                                    disabled={!loading}
                                    onClick={()=> {navigate(`/${projId}/testDocBaseline/${document.id}`)}}

                                >
                                    Test Documents of Version
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
                                    }}
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

            <ViewBaselineReqDetailsModal
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
                baselineDate={document.createdDate}
            ></ViewBaselineReqDetailsModal>

        </>
    );
};

export default RequirementDocumentBaseline;