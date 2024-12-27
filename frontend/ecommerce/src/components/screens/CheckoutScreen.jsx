import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import { saveShippingAddress } from "../../actions/cartActions";
import Message from "../Message";

const CheckoutScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Initialize state with values from localStorage or defaults
  const [address, setAddress] = useState(localStorage.getItem("address") || "");
  const [city, setCity] = useState(localStorage.getItem("city") || "");
  const [postalCode, setPostalCode] = useState(
    localStorage.getItem("postalCode") || ""
  );
  const [country, setCountry] = useState(localStorage.getItem("country") || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=/checkout");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Save values to Redux and localStorage
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    localStorage.setItem("address", address);
    localStorage.setItem("city", city);
    localStorage.setItem("postalCode", postalCode);
    localStorage.setItem("country", country);
    navigate("/payment");
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const tax = (0.15 * subtotal).toFixed(2); // Assuming 15% tax
  const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

  return (
    <Row>
      <Col md={6}>
        <h2>Shipping Details</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="city" className="mt-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="postalCode" className="mt-3">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="country" className="mt-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="mt-3">
            Continue
          </Button>
          <Button onClick={() => navigate("/cart")} className="mt-3 ">
            Back to Cart
          </Button>
        </Form>
      </Col>

      <Col md={6}>
        <h2>Order Summary</h2>
        {cartItems.length === 0 ? (
          <Message variant="info">Your cart is empty</Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col>{item.productname}</Col>
                  <Col>
                    {item.qty} x Rs.{item.price} = Rs.{item.qty * item.price}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <Row>
                <Col>Subtotal:</Col>
                <Col>Rs.{subtotal}</Col>
              </Row>
              <Row>
                <Col>Tax:</Col>
                <Col>Rs.{tax}</Col>
              </Row>
              <Row>
                <Col>Total:</Col>
                <Col>Rs.{total}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default CheckoutScreen;
