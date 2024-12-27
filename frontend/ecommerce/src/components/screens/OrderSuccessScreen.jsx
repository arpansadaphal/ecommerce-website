import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, ListGroup, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const OrderSuccessScreen = ({ order }) => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <div
      className="order-success"
      style={{ padding: "20px", fontFamily: "'Roboto', sans-serif" }}
    >
      <div className="text-center">
        <h1 className="display-4 mb-4">Thank You for Your Purchase!</h1>
        <p className="lead mb-5">
          Your order has been placed successfully. We’re getting your items
          ready for shipment.
        </p>
      </div>

      <Card className="mb-4 shadow-sm">
        <Card.Header as="h2" className="bg-primary text-white">
          Order Summary
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col xs={12} md={8}>
                    <strong>{item.productname}</strong>
                  </Col>
                  <Col xs={6} md={2} className="text-center">
                    {item.qty} x Rs.{item.price}
                  </Col>
                  <Col xs={6} md={2} className="text-end">
                    <strong>Rs.{item.qty * item.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <div className="text-center mb-4">
        <Button
          variant="primary"
          onClick={() => navigate("/")}
          size="lg"
          className="mx-2"
        >
          Continue Shopping
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => navigate("/order/history")}
          size="lg"
          className="mx-2"
        >
          View Order History
        </Button>
      </div>

      <div className="mt-5 text-center">
        <p className="text-muted">
          Need help? Contact our <strong>Customer Support</strong>.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccessScreen;
