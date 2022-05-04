import React from "react";
import {Button, Modal, Form} from "react-bootstrap";

const EditTestStepModal = ({
                               showUpdateStep,
                               testStepUpdateClose,
                               onSubmitUpdateStep,
                               selectedStep,
                               testCaseInfo,
                               stepDesc,
                               stepInput,
                               stepExpected,
                               stepComment,
                               stepReqs,
                               setTestStepDescription,
                               setTestStepInputs,
                               setTestStepExpected,
                               setTestStepComments,
                               setTestStepRequirements,
                               setFillerTestCaseId,
                           }
    ) => {
        return (
            <Modal
                //Add Test Case Model
                show={showUpdateStep}
                onHide={testStepUpdateClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Test Step
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmitUpdateStep}>
                        <Form.Label>Test Step Description</Form.Label>
                        <Form.Control
                            onChange={(e) => setTestStepDescription(e.target.value)}
                            style={{height: "100px"}}
                            rows="5"
                            as="textarea"
                            placeholder="Enter the description for the test step"
                            value={stepDesc}
                        />
                        <Form.Label style={{marginTop: "20px"}}>Test Step Inputs</Form.Label>
                        <Form.Control
                            onChange={(e) => setTestStepInputs(e.target.value)}
                            style={{height: "100px"}}
                            rows="5"
                            as="textarea"
                            placeholder="Enter inputs for the test step"
                            value={stepInput}
                        />
                        <Form.Label style={{marginTop: "20px"}}>Test Step Expected Outputs</Form.Label>
                        <Form.Control
                            onChange={(e) => setTestStepExpected(e.target.value)}
                            style={{height: "100px"}}
                            rows="5"
                            as="textarea"
                            placeholder="Enter expected outputs for the test step"
                            value={stepExpected}

                        />
                        <Form.Label style={{marginTop: "20px"}}>Test Step Comment</Form.Label>
                        <Form.Control
                            onChange={(e) => setTestStepComments(e.target.value)}
                            style={{height: "100px"}}
                            rows="5"
                            as="textarea"
                            placeholder="Enter the comment for the test step"
                            value={stepComment}

                        />
                        {/*<Form.Group className="mb-3" controlId="" style={{marginTop: "20px"}}>
                            <Form.Label>Requirement(s) that been Tested</Form.Label>
                            <Form.Control
                                onChange={(e) => setTestStepRequirements(e.target.value)}
                                type="text"
                                placeholder="Enter requirement name(s)"
                                value={stepReqs}
                            />
                        </Form.Group>*/}
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Update Test Step
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
;
export default EditTestStepModal;
