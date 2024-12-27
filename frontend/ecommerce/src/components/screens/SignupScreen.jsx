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
import { signup } from "../../actions/userActions";

const SignupScreen = () => {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [message, setMessage] = useState("erasror");
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userSignup = useSelector((state) => state.userSignup);
  const { error, loading, userInfo } = userSignup;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (pass1 != pass2) {
      setMessage("Password does not match");
      navigate("/signup");
    } else if (!validPassword.test(pass1)) {
      setMessage("Password criteria does not match");
    } else {
      dispatch(signup(fname, lname, email, pass1));
      setMessage("Signup us success");
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Card>
              <Card.Header as="h3" className="text-center bg-black text-light">
                Sign Up
              </Card.Header>
              <Card.Body>
                {/* {message && <Message variant="danger">{message}</Message>} */}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="fname">
                    <Form.Label>
                      <span>
                        <i className="fa fa-user"></i>
                      </span>{" "}
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your First Name"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="lname">
                    <Form.Label>
                      <span>
                        <i className="fa fa-user"></i>
                      </span>{" "}
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your  Name"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
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
                  <Form.Group className="mb-3" controlId="pass2">
                    <Form.Label>
                      <span>
                        <i className=""></i>
                      </span>{" "}
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={pass2}
                      onChange={(e) => setPass2(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <br />
                  <div className="d-grid gap-2">
                    <Button className="btn btn-md btn-success" type="submit">
                      {" "}
                      Sign Up
                    </Button>
                  </div>
                </Form>
                <Row className="py-3">
                  <Col>
                    Already a user?
                    <Link to="/login"> Log In</Link>
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

export default SignupScreen;
