import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

const AddRequirGroupModal = ({
  showGroup,
  groupClose,
  onSubmitGroup,
  setGroupName,
}) => {
  return (
    <Modal
      //Add Requirement Group Modal
      show={showGroup}
      onHide={groupClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Requirement Group
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitGroup}>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              onChange={(e) => setGroupName(e.target.value)}
              type="text"
              placeholder="Enter the name for the Group"
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="warning" type="submit">
              Add Group
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddRequirGroupModal;
