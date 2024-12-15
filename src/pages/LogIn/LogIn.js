import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  logIn,
  logOut,
  reset,
} from "../../features/users/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, message,isLoggedIn } = useSelector((state) => state.users);

  useEffect(() => {
      dispatch(logOut());
  }, [dispatch]);

  const credentialsTemplate = {
    email: "",
    password: "",
  };
  const [credentials, setCredentials] = useState(credentialsTemplate);

  // Handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  // Log In
  const logInFunc = (e) => {
    e.preventDefault();
    dispatch(logIn(credentials));
  };

  // Check API Status

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
      setCredentials(credentialsTemplate);
    }

    if (isError) {
      toast.error(message);
    }
  }, [isSuccess, isError, message]);

  return (
    <>
      <Container className="my-4">
        <h1 className="my-3">Log In</h1>
        <Form onSubmit={logInFunc}>
          <Form.Group
            as={Col}
            md={5}
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group
            as={Col}
            md={5}
            className="mb-3"
            controlId="formBasicPassword"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Log In
          </Button>
          <Link className="mx-4" to={"/signup"}>
            Haven't sign up? Create an account.
          </Link>
        </Form>
      </Container>
    </>
  );
}

export default LogIn;
