import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  CardBody,
} from "react-bootstrap";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { validPassword } from "./Regex";
import { login } from "../../actions/userActions";

const LoginScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  console.log(error);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, pass1));
    // console.log(email, pass1);
    setMessage("Log in success");
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Card>
              <Card.Header as="h3" className="text-center bg-black text-light">
                Log In
              </Card.Header>
              <Card.Body>
                {/* {error && <Message variant="danger">{error}</Message>} */}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>
                      <span>
                        <i className="fa-solid fa-envelope"></i>
                      </span>{" "}
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Your  Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="pass1">
                    <Form.Label>
                      <span>
                        <i className=""></i>
                      </span>{" "}
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Your Password"
                      value={pass1}
                      onChange={(e) => setPass1(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>

                  <br />
                  <div className="d-grid gap-2">
                    <Button className="btn btn-md btn-success" type="submit">
                      {" "}
                      Log In
                    </Button>
                  </div>
                </Form>
                <Row className="py-3">
                  <Col>
                    New user?
                    <Link to="/signup"> Sign Up</Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginScreen;
