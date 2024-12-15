import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../features/users/usersSlice";
import { useDispatch } from "react-redux";

function SignUp() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const credentialsTemplate = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [credentials, setCredentials] = useState(credentialsTemplate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };


  const signUpFunc = (e) => {
    e.preventDefault();
    // Validate
    if (credentials.password === credentials.confirmPassword) {
      const { firstName, lastName, username, email, password } = credentials;
      dispatch(
        signUp({
          firstName,
          lastName,
          username,
          email,
          password,
        })
      );
      navigate('/login');
    }
    setCredentials(credentialsTemplate);
  };
  return (
    <>
      <Container className="my-4">
        <h1 className="mb-3">Sign Up</h1>
        <Form onSubmit={signUpFunc}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={credentials.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={credentials.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
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
            <Form.Group as={Col} md="4">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter Username"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Sign Up
          </Button>
          <Link className="mx-4" to={"/login"}>
            Already have an account? Login!
          </Link>
        </Form>
      </Container>
    </>
  );
}

export default SignUp;
