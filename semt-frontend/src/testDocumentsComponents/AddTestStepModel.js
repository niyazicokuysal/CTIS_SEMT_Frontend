import React from "react";
import {Button, Modal, Form, Alert} from "react-bootstrap";

const AddTestStepModel = ({
  testCaseInfo,
  setFillerTestCaseId,
  showTestStepAdd,
  testStepAddClose,
  onSubmitStep,
  setTestStepDescription,
  setTestStepInputs,
  setTestStepExpected,
  setTestStepComments,
  setTestStepRequirements,
}) => {
  return (
    <Modal
      //Add Test Case Model
      show={showTestStepAdd}
      onHide={testStepAddClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Test Step to {testCaseInfo.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitStep}>
          <Form.Label>Test Step Description</Form.Label>
          <Form.Control
            onChange={(e) => setTestStepDescription(e.target.value)}
            style={{ height: "100px" }}
            rows="5"
            as="textarea"
            placeholder="Enter the description for the test step"
          />
          <Form.Label style={{marginTop:"20px"}}>Test Step Inputs</Form.Label>
          <Form.Control
            onChange={(e) => setTestStepInputs(e.target.value)}
            style={{ height: "100px" }}
            rows="5"
            as="textarea"
            placeholder="Enter inputs for the test step"
          />
          <Form.Label style={{marginTop:"20px"}}>Test Step Expected Outputs</Form.Label>
          <Form.Control
            onChange={(e) => setTestStepExpected(e.target.value)}
            style={{ height: "100px" }}
            rows="5"
            as="textarea"
            placeholder="Enter expected outputs for the test step"
          />
          <Form.Label style={{marginTop:"20px"}}>Test Step Comment</Form.Label>
          <Form.Control
            onChange={(e) => setTestStepComments(e.target.value)}
            style={{ height: "100px" }}
            rows="5"
            as="textarea"
            placeholder="Enter the comment for the test step"
          />
         <Form.Group className="mb-3" controlId="" style={{marginTop:"20px"}}>
            <Form.Label>Requirement(s) to test</Form.Label>
            <Alert variant={"danger"}>
              <p>Test Case Step Requirements can NOT be updated.</p>
              Seperate the requirements with "/".
            </Alert>
            <Form.Control
              onChange={(e) => setTestStepRequirements(e.target.value)}
              type="text"
              placeholder="Enter requirement name(s)"
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={() => setFillerTestCaseId(testCaseInfo.id)}>
              Add Test Step
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTestStepModel;
