import React from "react";
import {Button, Modal, Form} from "react-bootstrap";

const EditTestDocumentInfoModel = ({
                                       showTestDoc,
                                       testDocClose,
                                       onUpdateTestDocument,
                                       testDocName,
                                       testDocDesc,
                                       setTestDocName,
                                       setTestDocDesc,
                                   }) => {
    return (
        <Modal
            //Edit document modal
            show={showTestDoc}
            onHide={testDocClose}
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
                <Form onSubmit={onUpdateTestDocument}>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Edit Document Name</Form.Label>
                        <Form.Control
                            onChange={(e) => setTestDocName(e.target.value)}
                            type="text"
                            placeholder="Enter the name for the Document"
                            value={testDocName}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Edit Document Description</Form.Label>
                        <Form.Control
                            onChange={(e) => setTestDocDesc(e.target.value)}
                            style={{height: "200px"}}
                            rows="5"
                            as="textarea"
                            placeholder="Enter the description for the Document"
                            value={testDocDesc}
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

export default EditTestDocumentInfoModel;
