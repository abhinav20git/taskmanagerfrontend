import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  getAllTasks,
  PendingTask,
  AllTasks,
  reset,
  ProgressTask,
  CompletedTask,
  updateTask,
} from "../../features/tasks/tasksSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get all tasks
  const allTasks = useSelector((state) => state.tasks.tasks);
  const { isDeleteSuccessfull, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.tasks);
  const { token, userId, isLoggedIn } = useSelector((state) => state.users);

  // When not logged in, navigate to log in.
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(reset());
      dispatch(getAllTasks({ token, userId }));
    } else {
      navigate("/login");
    }
  }, []);

  // Update function
  const updateTaskFunc = (id) => {
    navigate(`/task/${id}`);
    dispatch(reset());
  };

  // Delete task
  const deleteTaskFunc = (id) => {
    dispatch(deleteTask({ id, token }));
  };

  // Complete
  const taskCompleted = (completedTask) => {
    const task = {
      ...completedTask,
      status: "Completed",
    };
    dispatch(updateTask({ task, token }));
    dispatch(getAllTasks({ token, userId }));
    toast.success(`Task updated successfully!`);
  };

  // inProgress
  const inProgress = (inProgressTask) => {
    const task = {
      ...inProgressTask,
      status: "In-progress",
    };
    dispatch(updateTask({ task, token }));
    dispatch(getAllTasks({ token, userId }));
    toast.success(`Task updated successfully!`);
  };

  useEffect(() => {
    if (isDeleteSuccessfull) {
      dispatch(reset());
      dispatch(getAllTasks({ token, userId }));
    }
  });

  return (
    <>
      <Container className="my-4">
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <h1> Dashboard</h1>
          <div className="d-flex align-items-center gap-2">
            <Button onClick={() => dispatch(AllTasks())}>All</Button>
            <Button onClick={() => dispatch(PendingTask())}>To-do</Button>
            <Button onClick={() => dispatch(ProgressTask())}>
              In-progress
            </Button>
            <Button onClick={() => dispatch(CompletedTask())}>Completed</Button>
            <i
              className="fa-solid fa-plus mx-2 fs-2"
              type="button"
              title="Create task"
              onClick={() => {
                navigate("/task");
                dispatch(reset());
              }}
            />
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                {" "}
                <tr>
                  {" "}
                  <td colSpan="6"> Loading....</td>{" "}
                </tr>
              </>
            ) : (
              <></>
            )}
            {isSuccess ? (
              <>
                {allTasks && (
                  <>
                    {allTasks.map((task, id) => (
                      <tr key={id}>
                        <td>{id + 1}</td>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.status}</td>
                        <td>{task.dueDate}</td>
                        <td>{task.priority}</td>
                        <td className="d-flex gap-2">
                          {task.status !== "Completed" ? (
                            <>
                              <Button
                                size="sm"
                                variant="info"
                                title="Update Task"
                                onClick={() => updateTaskFunc(task._id)}
                              >
                                <i
                                  className="fa-solid fa-pen-to-square"
                                  style={{ color: "#ffffff" }}
                                />
                              </Button>
                            </>
                          ) : (
                            <></>
                          )}

                          <Button
                            size="sm"
                            variant="danger"
                            title="Delete Task"
                            onClick={() => deleteTaskFunc(task._id)}
                          >
                            <i className="fa-solid fa-trash" />
                          </Button>
                          {task.status === "To-do"? (
                            <>
                              <Button
                                size="sm"
                                variant="primary"
                                title="Task In-progress"
                                onClick={() => inProgress(task)}
                              >
                                <i className="fa-solid fa-bars-progress" />
                              </Button>
                            </>
                          ) : (
                            <></>
                          )}
                          {task.status !== "Completed" ? (
                            <>
                              <Button
                                size="sm"
                                variant="success"
                                title="Completed Task"
                                onClick={() => taskCompleted(task)}
                              >
                                <i className="fa-solid fa-check" />
                              </Button>
                            </>
                          ) : (
                            <></>
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Dashboard;
