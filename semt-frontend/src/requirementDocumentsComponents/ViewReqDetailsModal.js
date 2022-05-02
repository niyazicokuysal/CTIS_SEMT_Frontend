import React, { useEffect } from "react";
import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import moment from "moment";
import Switch from "react-js-switch";

const ViewReqDetailsModal = ({
  showDetails,
  detailsClose,
  singleReqInfo,
  singleGroupInfo,
  reqHistory,
  getReqHistory,
  loadingForReq,
  showReqHistory,
  loadingForReqHistory,
  setShowReqHistory,
  loadReqHistory,
  docGroups,
}) => {
  return (
    <Modal
      //View Details Modal
      show={showDetails}
      onHide={detailsClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Row style={{ width: "100%" }}>
          <Col sm={6}>
            <Modal.Title id="contained-modal-title-vcenter">
              {singleReqInfo.name}
            </Modal.Title>
          </Col>
          <Col sm={4} style={{ paddingTop: "7px" }}>
            <h5>Toggle to Show History</h5>
          </Col>
          <Col sm={1} style={{ paddingTop: "7px" }}>
            <Switch
              borderColor={{ on: "#f46e0f", off: "#f9f9f9" }}
              backgroundColor={{ on: "#f46e0f", off: "#D0CDC8" }}
              color="#E3E3E3"
              value={showReqHistory}
              size={60}
              onChange={() => {
                {
                  if (showReqHistory === false) {
                    loadReqHistory(singleReqInfo.name);
                    setShowReqHistory(true);
                  } else {
                    setShowReqHistory(false);
                  }
                }
              }}
            />
          </Col>
        </Row>
      </Modal.Header>
      <Modal.Body>
        {!loadingForReq ? (
          <Spinner
            style={{
              position: "relative",
              top: "40%",
              left: "50%",
            }}
            animation="grow"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            <h5>Description: {singleReqInfo.description} </h5>
            <h5>Comment: {singleReqInfo.comment} </h5>
            <h5>
              Create Date: {moment(singleReqInfo.createdDate).format("LLLL")}{" "}
            </h5>
            <h5>
              Update Date:{" "}
              {singleReqInfo.updatedDate === null
                ? "Not Yet Modified"
                : moment(singleReqInfo.updatedDate).format("LLLL")}{" "}
            </h5>
            <h5>
              Group:{" "}
              {singleReqInfo.requirementGroupId === null
                ? "No Group"
                : docGroups.filter(doc => doc.id === singleReqInfo.requirementGroupId)[0].name}{" "}
            </h5>
            <h5>Test Type: {singleReqInfo.testTypes} </h5>

            <br></br>
            <>
              {showReqHistory ? (
                <>
                  <></>
                  <>
                    {!loadingForReqHistory ? (
                      <Spinner
                        style={{
                          position: "relative",
                          top: "40%",
                          left: "50%",
                        }}
                        animation="grow"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : (
                      <>
                        <>
                          {reqHistory.length == 0 ? (
                            <h5>This requirement has not been updated yet.</h5>
                          ) : (
                            <>
                              <h5>History:</h5>
                              {reqHistory
                                .slice()
                                .reverse()
                                .map((hist, i) => (
                                  <>
                                    --------------------------------------------------
                                    <h5>Description: {hist.description} </h5>
                                    <h5>Comment: {hist.comment} </h5>
                                    <h5>
                                      Update Date:{" "}
                                      {hist.updatedDate === null
                                        ? "First Entry"
                                        : moment(hist.updatedDate).format(
                                            "LLLL"
                                          )}{" "}
                                    </h5>
                                   { <h5>
                                      Group:{" "}
                                      {hist.requirementGroupId === null
                                        ? "No Group"
                                        : docGroups.filter(doc => doc.id === hist.requirementGroupId)[0].name}{" "}

                                    </h5>}
                                    <h5>Test Type: {hist.testTypes} </h5>
                                    ----------------------------------------------------------
                                  </>
                                ))}
                            </>
                          )}
                        </>
                      </>
                    )}
                  </>
                </>
              ) : (
                <></>
              )}
            </>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ViewReqDetailsModal;
