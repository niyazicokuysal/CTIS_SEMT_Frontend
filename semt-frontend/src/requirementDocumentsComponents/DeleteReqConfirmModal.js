import React from "react";
import {Button, Modal, Form, Row, Col} from "react-bootstrap";

const DeleteReqConfirmModal = ({
                                showReqDeleteConfirmation,
                                closeReqDeleteConfirmation,
                                requirement,
                                deleteRequirement
                            }) => {
    return (
        <Modal
            //Add Requirement Group Modal
            show={showReqDeleteConfirmation}
            onHide={closeReqDeleteConfirmation}
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
                                closeReqDeleteConfirmation();
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
                                closeReqDeleteConfirmation();
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
