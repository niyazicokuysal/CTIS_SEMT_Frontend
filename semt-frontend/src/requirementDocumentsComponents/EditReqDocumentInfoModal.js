import React from "react";
import {Button, Modal, Form} from "react-bootstrap";

const EditReqDocumentInfoModal = ({
                                      showDoc,
                                      docClose,
                                      onUpdateDocument,
                                      setDocTypeName,
                                      setDocDesc,
                                      docDesc,
                                      docName
                                  }) => {
    return (
        <Modal
            //Edit document modal
            show={showDoc}
            onHide={docClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Document Info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onUpdateDocument}>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Edit Document Name</Form.Label>
                        <Form.Control
                            onChange={(e) => setDocTypeName(e.target.value)}
                            type="text"
                            placeholder="Enter the name for the Document"
                            value={docName}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Edit Document Description</Form.Label>
                        <Form.Control
                            onChange={(e) => setDocDesc(e.target.value)}
                            style={{height: "200px"}}
                            rows="5"
                            as="textarea"
                            placeholder="Enter the description for the Document"
                            value={docDesc}
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="info" type="submit">
                            Update Document
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditReqDocumentInfoModal;
