import React, { useEffect } from 'react'
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllTasks, reset } from '../../features/tasks/tasksSlice';

function Report() {
     const dispatch = useDispatch();
      const navigate = useNavigate();
    const allTasks = useSelector((state) => state.tasks.tasks);
    const { isLoading, isSuccess } =
    useSelector((state) => state.tasks);
    const { token, userId, isLoggedIn } = useSelector((state) => state.users);
    useEffect(() => {
        if (isLoggedIn) {
          dispatch(reset());
          dispatch(getAllTasks({ token, userId }));
        } else {
          navigate("/login");
        }
      }, []);
    const calculatePercentage = (tasks, status) => {
        if (!tasks || tasks.length === 0) return 0;
        const count = tasks.filter(task => task.status === status).length;
        return ((count / tasks.length) * 100).toFixed(2);
      };
  return (
    <Container className="my-4">
  <h1 className="mb-4">Task Report</h1>
  <div className="d-flex justify-content-between align-items-center w-100 my-5" style={{ gap: "20px" }}>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      isSuccess && (
        <>
          <div className="text-center" style={{ flex: 1 }}>
            <p><strong>Total Tasks:</strong></p>
            <p>{allTasks.length}</p>
          </div>
          <div className="text-center" style={{ flex: 1 }}>
            <p><strong>To-do:</strong></p>
            <p className="text-warning">{calculatePercentage(allTasks, "To-do")} %</p>
          </div>
          <div className="text-center" style={{ flex: 1 }}>
            <p><strong>In-progress:</strong></p>
            <p className="text-primary">{calculatePercentage(allTasks, "In-progress")} %</p>
          </div>
          <div className="text-center" style={{ flex: 1 }}>
            <p><strong>Completed:</strong></p>
            <p className="text-success">{calculatePercentage(allTasks, "Completed")} %</p>
          </div>
        </>
      )
    )}
  </div>
</Container>

  )
}

export default Report