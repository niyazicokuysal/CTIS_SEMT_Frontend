import React from "react";
import {
    Button,
    Modal,
    Form,
  } from "react-bootstrap";

const EditProjectInfoModal = ({show, handleClose, onSubmit, setName, setDesc, projName, projDesc }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Project Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formCreateProject">
            <Form.Label>Edit Project Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter the name for the Project"
              value={projName}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Edit Project Description</Form.Label>
            <Form.Control
              onChange={(e) => setDesc(e.target.value)}
              style={{ height: "200px" }}
              rows="5"
              as="textarea"
              placeholder="Enter the description for the Project"
              value={projDesc}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="info" type="submit">
              Update Project
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProjectInfoModal;
