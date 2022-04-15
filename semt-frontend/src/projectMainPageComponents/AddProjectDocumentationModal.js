import React from 'react'
import { Link } from "react-router-dom";
import {
    Button,
    Modal,
    Form,
    Table,
  } from "react-bootstrap";

const AddProjectDocumentationModal = ({showDoc, docClose, projectReqDocs, onSubmitDocument, setNewDocName, setNewDocHeader, setNewDocParent, reqDocuments, projId}) => {
  return (
    <Modal
    show={showDoc}
    onHide={docClose}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Project Documentation
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Table hover className="documantTable">
        <thead>
          <tr>
            <th style={{ width: "320px" }}>Requirements Documentation</th>
            <th style={{ width: "320px" }}>Test Documentation</th>
          </tr>
        </thead>
        <tbody>
            {projectReqDocs.map((document, i) => (
              <tr key={i}>
                <td className="documentRow">
                  <Link to={`/${projId}/req/${document.id}`}>
                    {document.typeName}
                  </Link>
                </td>
                <td className="documentRow">
                  <Link to={`/${projId}/test/${document.testDocument.id}`}>
                    {document.testDocument.name}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Form onSubmit={onSubmitDocument}>
        <Form.Group className="mb-3" controlId="formCreateProject">
          <Form.Label>New Requirement Document</Form.Label>
          <Form.Control
            onChange={(e) => setNewDocName(e.target.value)}
            type="text"
            placeholder="Enter the name for the requirement document"
          />
          <Form.Label style={{ marginTop: "20px" }}>
            New Requirement Document's Header
          </Form.Label>
          <Form.Control
            onChange={(e) => setNewDocHeader(e.target.value)}
            type="text"
            placeholder="Enter the header"
          />
        </Form.Group>
        <Form.Select
            aria-label="Default select example"
            style={{ marginTop: "20px" }}
             onChange={(e) => {
              setNewDocParent(e.target.value);
            }} 
          >
            <option value="0" selected disabled>
              Select a Parent Requirement Document if you want
            </option>
            {reqDocuments.map((req, i) => (
              <option key={i} value={req.id}>
                {req.typeName}
              </option>
            ))}
          </Form.Select>

        <Modal.Footer>
          <Button variant="primary" type="submit">
            Add Requirement Documentation
          </Button>
        </Modal.Footer>
      </Form>
    </Modal.Body>
  </Modal>
  )
}

export default AddProjectDocumentationModal