import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Button, Form, Card } from "react-bootstrap";

function App() {
  const [projects, setProjects] = useState([]);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    status: "active",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch Projects
  const fetchProjects = () => {
    axios
      .get("/api/projects")
      .then((response) => setProjects(response.data))
      .catch((error) =>
        console.error("There was an error fetching projects:", error)
      );
  };

  // Create Project
  const createProject = () => {
    axios
      .post("/api/projects", projectData)
      .then(() => {
        fetchProjects();
        setProjectData({ name: "", description: "", status: "active" });
      })
      .catch((error) =>
        console.error("There was an error creating the project:", error)
      );
  };

  // Update Project
  const updateProject = () => {
    axios
      .put(`/api/projects/${editId}`, projectData)
      .then(() => {
        fetchProjects();
        setProjectData({ name: "", description: "", status: "active" });
        setEditMode(false);
      })
      .catch((error) =>
        console.error("There was an error updating the project:", error)
      );
  };

  // Delete Project
  const deleteProject = (id) => {
    axios
      .delete(`/api/projects/${id}`)
      .then(() => fetchProjects())
      .catch((error) =>
        console.error("There was an error deleting the project:", error)
      );
  };

  // Handle form submission (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      updateProject();
    } else {
      createProject();
    }
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  // Edit Project
  const handleEdit = (project) => {
    setProjectData(project);
    setEditMode(true);
    setEditId(project.id);
  };

  // Fetch projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Container className="my-5 ">
      <Row className="mb-3">
        <h2 className="text-center fs-2 text-primary">Managing Projects Application</h2>
        <h2 className="text-center fs-4 text-secondary">
          My Name is Eng. Ahmed Abukar Abdiwahab
        </h2>
      </Row>
      <Row className="g-4 d-flex justify-content-center align-items-center">
        {/* Form Section */}
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="text-center text-primary mb-4">
                {editMode ? "Edit Project" : "Add New Project"}
              </h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="projectName" className="mb-3">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter project name"
                    name="name"
                    value={projectData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="projectDescription" className="mb-3">
                  <Form.Label>Project Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter project description"
                    name="description"
                    value={projectData.description}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="projectStatus" className="mb-4">
                  <Form.Label>Project Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={projectData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="completed">Completed</option>
                  </Form.Select>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2"
                >
                  {editMode ? "Update Project" : "Add Project"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Projects List Section */}
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="text-center text-success mb-4">Projects List</h3>
              {projects.length > 0 ? (
                <Table responsive striped bordered hover className="text-center">
                  <thead className="table-primary">
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th style={{ width: "15%" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>{project.description}</td>
                        <td>
                          <span
                            className={`badge ${
                              project.status === "active"
                                ? "bg-success"
                                : project.status === "inactive"
                                ? "bg-warning text-dark"
                                : "bg-secondary"
                            }`}
                          >
                            {project.status}
                          </span>
                        </td>
                        <td>
                          {new Date(project.created_at).toLocaleString()}
                        </td>
                        <td>
                          {new Date(project.updated_at).toLocaleString()}
                        </td>
                        <td style={{ width: "15%" }}>
                          <Button
                            variant="primary"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEdit(project)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => deleteProject(project.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center text-muted">No projects found.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
