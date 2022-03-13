import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

function CreateProjectModal(props) {
 
/* setOpenModal, addProject,  */
 const [name, setName] = useState("");
  const [description, setDesc] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description) {
      alert("Please add the credentials");
      return;
    }

   // addProject({ name, description });
    setName("");
    setDesc("");
    //setOpenModal(false);
  }; 

  return (
     <Modal
      {...props}
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
            <Button variant="primary" type="submit">
              Add The Project
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal> 
  );
};

export default CreateProjectModal;
