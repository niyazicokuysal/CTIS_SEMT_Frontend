import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

const AddRequirementInDocumentModal = ({
  showReq,
  reqClose,
  onSubmitReq,
  setReqDesc,
  setReqComment,
  setReqType,
  setReqGrp = 0,
  docGroups,
}) => {
  return (
    <Modal
      //Add Requirement In Document
      show={showReq}
      onHide={reqClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Requirement
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitReq}>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={(e) => setReqDesc(e.target.value)}
              style={{ height: "100px" }}
              rows="5"
              as="textarea"
              placeholder="Enter the description for the Requirement"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              onChange={(e) => setReqComment(e.target.value)}
              style={{ height: "100px" }}
              rows="5"
              as="textarea"
              placeholder="Enter the comment for the Requirement"
            />
          </Form.Group>

          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setReqType(e.target.value);
            }}
          >
            <option value="0" selected disabled>
              Please select a Type
            </option>
            <option value="Inspection">Inspection</option>
            <option value="Demonstration">Demonstration</option>
            <option value="Test">Test</option>
            <option value="Analysis">Analysis</option>
            <option value="Certification">Certification</option>
          </Form.Select>

          <Form.Select
            aria-label="Default select example"
            style={{ marginTop: "20px" }}
            onChange={(e) => {
              setReqGrp(e.target.value);
            }}
          >
            <option value="0" selected disabled>
              Select a Group(Optional)
            </option>
            {docGroups.map((doc, i) => (
              <option key={i} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </Form.Select>

          <Modal.Footer>
            <Button variant="success" type="submit">
              Add Requirement
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddRequirementInDocumentModal;
