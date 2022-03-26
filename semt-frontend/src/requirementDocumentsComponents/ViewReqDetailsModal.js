import React from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";

const ViewReqDetailsModal = ({showDetails, detailsClose, singleReqInfo, singleGroupInfo}) => {
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
        <Modal.Title id="contained-modal-title-vcenter">
          {singleReqInfo.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          {singleGroupInfo === null ? "Has no Group" : singleGroupInfo.name}{" "}
        </h5>
        <h5>Test Type: {singleReqInfo.testTypes} </h5>
      </Modal.Body>
    </Modal>
  );
};

export default ViewReqDetailsModal;
