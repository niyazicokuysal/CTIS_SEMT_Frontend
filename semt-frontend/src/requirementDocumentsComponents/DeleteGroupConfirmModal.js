import React from "react";
import {Button, Modal, Form, Row, Col} from "react-bootstrap";

const DeleteGroupConfirmModal = ({
                                showGroupDeleteConfirmation,
                                closeGroupDeleteConfirmation,
                                group,
                                deleteReqGroup
                            }) => {
    return (
        <Modal
            //Add Requirement Group Modal
            show={showGroupDeleteConfirmation}
            onHide={closeGroupDeleteConfirmation}
            size=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Are you sure you want to delete {group.name}?
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
                                closeGroupDeleteConfirmation();
                                deleteReqGroup(group.id);
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
                                closeGroupDeleteConfirmation();
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

export default DeleteGroupConfirmModal;
