import React from "react";
import {
    Button,
    Modal,
    Form,
  } from "react-bootstrap";

const CreateNewProjectModal = ({ show, handleClose, onSubmit, name, setName, description, setDesc }) => {
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
          Create New Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formCreateProject">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter the name for the Project"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              style={{ height: "200px" }}
              rows="5"
              as="textarea"
              placeholder="Enter the description for the Project"
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Add The Project
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNewProjectModal;
