import React from "react";
import {Button, Modal, Form, Row, Col} from "react-bootstrap";

const DeleteProjConfirmModal = ({
                                showDeleteConfirmation,
                                closeDeleteConfirmation,
                                project,
                                deleteProject
                            }) => {
    return (
        <Modal
            show={showDeleteConfirmation}
            onHide={closeDeleteConfirmation}
            size=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Are you sure you want to delete {project.name}?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row  style={{position: "relative", left: "15%"}}>
                    <Col>
                        <Button
                            variant="danger"
                            style={{position: "relative"}}
                            onClick={() => {
                                closeDeleteConfirmation();
                                deleteProject(project.id);
                            }}
                        >
                            Delete
                        </Button>
                    </Col>
                    <Col>
                        <Button
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

export default DeleteProjConfirmModal;
