import React from 'react'
import { useLocation } from "react-router-dom";
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

const RequirementDocumentBaseline = () => {
    const { pathname } = useLocation();
    const path = pathname.split("/");
    const projId = path[1];
    const reqDocName= path[3];
  
  return (
    <>
{/*     {!loadingForProject && !loadingForDocument ? (
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
                                >
                                    Edit Document Info
                                </Button>
                                <Button
                                    size="lg"
                                    variant="success"
                                    className="btnReqDoc"
                                    onClick={reqShow}
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
                                >
                                    Add Requirements Group
                                </Button>
                                <Button
                                    size="lg"
                                    variant="dark"
                                    className="btnReqDoc"
                                    onClick={()=> {console.log(docGroups)}}
                                >
                                    Create Baseline of Document
                                </Button>
                            </Col>
                        </Row>
                        <Row className="tableSwitch">
                            <Col sm={2} style={{paddingBottom:"10px"}}>
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
                                    <tbody>
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
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <div style={{ height: "100px" }}></div>
                    </Container>
                </>
            )} */}
    </>
  )
}

export default RequirementDocumentBaseline