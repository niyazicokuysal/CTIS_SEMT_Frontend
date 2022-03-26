import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

const AddTestCaseModel = ({
  showTestCaseAdd,
  testCaseAddClose,
  onSubmitCase,
  setTestName,
  setRequirementString,
  setDesc,
}) => {
  return (
    <Modal
      //Add Test Case Model
      show={showTestCaseAdd}
      onHide={testCaseAddClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Test Case
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitCase}>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Name of the Case</Form.Label>
            <Form.Control
              onChange={(e) => setTestName(e.target.value)}
              type="text"
              placeholder="Enter a name for the Case"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Requirement(s) that been Tested</Form.Label>
            <Form.Control
              onChange={(e) => setRequirementString(e.target.value)}
              type="text"
              placeholder="Enter requirement name(s)"
            />
          </Form.Group>
          <Form.Label>Test Case Description</Form.Label>
          <Form.Control
            onChange={(e) => setDesc(e.target.value)}
            style={{ height: "200px" }}
            rows="5"
            as="textarea"
            placeholder="Enter the description for the Project"
          />
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Add Test Case
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTestCaseModel;
