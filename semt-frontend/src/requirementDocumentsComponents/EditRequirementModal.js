import React from "react";
import {Button, Modal, Form, Spinner} from "react-bootstrap";

const EditRequirementModal = ({
                                  showUpdateReq,
                                  updateReqClose,
                                  onUpdateReq,
                                  setReqDesc,
                                  setReqComment,
                                  setReqType,
                                  setReqGrp,
                                  docGroups,
                                  reqGrp,
                                  reqDesc,
                                  reqComment,
                                  reqType
                              }) => {
    return (
        <Modal
            //Edit Requirement
            show={showUpdateReq}
            onHide={updateReqClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Requirement
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onUpdateReq}>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            onChange={(e) => setReqDesc(e.target.value)}
                            style={{height: "100px"}}
                            rows="5"
                            as="textarea"
                            placeholder={reqDesc}
                            value={reqDesc}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            onChange={(e) => setReqComment(e.target.value)}
                            style={{height: "100px"}}
                            rows="5"
                            as="textarea"
                            placeholder="Enter the comment for the Requirement"
                            value={reqComment}
                        />
                    </Form.Group>

                    <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => {
                            setReqType(e.target.value);
                        }}
                        value={reqType}
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
                        style={{marginTop: "20px"}}
                        onChange={(e) => {
                            if (e.target.value == 0) {
                                setReqGrp(null);
                            } else {
                                setReqGrp(e.target.value);
                            }
                        }}
                        value={reqGrp}
                    >
                        <option value="0">
                            No group
                        </option>
                        {docGroups.map((doc, i) => (
                            <option key={i} value={doc.id}>
                                {doc.name}
                            </option>
                        ))}
                    </Form.Select>

                    <Modal.Footer>
                        <Button variant="info" type="submit">
                            Update Requirement
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditRequirementModal;

