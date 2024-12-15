import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  getAllTasks,
  getTask,
  reset,
  updateTask,
} from "../../features/tasks/tasksSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Task() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.users);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      
    }
  }, []);

  // Create new task object
  const taskTemplate = {
    userId: "",
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "To-do",
  };

  const [task, setTask] = useState(taskTemplate);
  const utask = useSelector((state) => state.tasks.taskToUpdate);
  const { isSuccess, isError, message } = useSelector((state) => state.tasks);
  const uId = useSelector((state) => state.users.userId);
  const token = useSelector((state) => state.users.token);

  // Check API Status

  // Update task
  useEffect(() => {
    if (id) {
      dispatch(getTask({id, token}));
    }
  }, []);
  useEffect(() => {
    if (id) {
      {
        setTask({ ...taskTemplate, ...utask });
      }
    }
  }, [utask]);

  // Set task state.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  // Create a new task
  const createTaskFunc = () => {
    let finalTask = { ...task, userId: uId };
    dispatch(createTask({ finalTask, token }));
    setTask(taskTemplate);
  };

  // Update task
  const saveChangesFunc = () => {
    dispatch(updateTask({task, token}));
    setTask(taskTemplate);
    // toast.success("Task updated successfully!");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Task ${id? "updated" : "created"} successfully!`);
      navigate("/dashboard");
      dispatch(reset());
    }

    if (isError) {
      toast.error(message);
    }
  }, [isSuccess, isError, message]);

  return (
    <>
      <Container className="my-4">
        <h1 className="mb-4">{id ? "Update Task" : "Create Task"}</h1>
        <Form>
          <Row className="mb-3">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="E.g. Calculus Assignment submission"
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="E.g. Assignment has to submit before Sunday!"
                style={{ height: "200px" }}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md={4}>
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
      <Form.Group as={Col} md={4}>
        <Form.Label>Priority</Form.Label>
        <Form.Select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          required
        >
          <option value="">Select Priority</option>
          <option value="1">1 - Low</option>
          <option value="2">2</option>
          <option value="3">3 - Medium</option>
          <option value="4">4</option>
          <option value="5">5 - High</option>
        </Form.Select>
      </Form.Group>
    </Row>

          {id ? (
            <Button variant="primary" onClick={saveChangesFunc}>
              Save Changes
            </Button>
          ) : (
            <Button variant="primary" onClick={createTaskFunc}>
              Create Task
            </Button>
          )}
        </Form>
      </Container>
    </>
  );
}

export default Task;
