import React from "react";
import {Button, Modal, Form, Row, Col} from "react-bootstrap";

const DeleteReqConfirmModal = ({
                                showDeleteConfirmation,
                                closeDeleteConfirmation,
                                requirement,
                                deleteRequirement
                            }) => {
    return (
        <Modal
            //Add Requirement Group Modal
            show={showDeleteConfirmation}
            onHide={closeDeleteConfirmation}
            size=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Are you sure you want to delete {requirement.name}?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row  style={{position: "relative", left: "15%"}}>
                    <Col>
                        <Button
                            //size="sm"
                            variant="danger"
                            style={{position: "relative"}}
                            onClick={() => {
                                closeDeleteConfirmation();
                                deleteRequirement(requirement.id);
                            }}
                        >
                            Delete
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            //size="sm"
                            variant="primary"
                            style={{position: "relative"}}
                            onClick={() => {
                                closeDeleteConfirmation();
                            }}
                        >
                            Cancel
                        </Button>
                    </Col>

                </Row>

            </Modal.Body>
        </Modal>
    );
};

export default DeleteReqConfirmModal;
