import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import Message from "../Message";
import { createOrder } from "../../actions/cartActions";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Initialize state with values from localStorage or defaults
  const [address, setAddress] = useState(localStorage.getItem("address") || "");
  const [city, setCity] = useState(localStorage.getItem("city") || "");
  const [postalCode, setPostalCode] = useState(
    localStorage.getItem("postalCode") || ""
  );
  const [country, setCountry] = useState(localStorage.getItem("country") || "");
  const [paymentMethod, setPaymentMethod] = useState(
    localStorage.getItem("paymentMethod") || ""
  );

  const cart = useSelector((state) => state.cart);

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 50);
  cart.taxPrice = addDecimals(Number((0.18 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const placeOrderHandler = () => {
    if (!address || !city || !postalCode || !country) {
      navigate("/shipping");
    } else {
      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress: { address, city, postalCode, country },
          paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        })
      );
      navigate("/order/success");
    }
  };

  useEffect(() => {
    // Store the shipping address details in localStorage when they change
    localStorage.setItem("address", address);
    localStorage.setItem("city", city);
    localStorage.setItem("postalCode", postalCode);
    localStorage.setItem("country", country);
    localStorage.setItem("paymentMethod", paymentMethod);
  }, [address, city, postalCode, country, paymentMethod]);

  return (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Shipping</h2>
            {address && city && postalCode && country ? (
              <p>
                <strong>Address: </strong>
                {address}, {city}, {postalCode}, {country}
              </p>
            ) : (
              <Message variant="danger">No shipping address provided</Message>
            )}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Payment Method</h2>
            <strong>Method: </strong>
            {paymentMethod}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ListGroup variant="flush">
                {cart.cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={2}>
                        <Image
                          src={`http://localhost:8000/${item.image}`}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        <strong>{item.name}</strong>
                      </Col>
                      <Col md={4}>
                        {item.qty} x Rs.{item.price} = Rs.
                        {item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>Rs.{cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>Rs.{cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>Rs.{cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>Rs.{cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default PlaceOrderScreen;
