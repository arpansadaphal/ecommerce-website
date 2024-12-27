import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../actions/cartActions";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Razorpay"
              id="Razorpay"
              name="paymentMethod"
              value="Razorpay"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Credit/Debit Card"
              id="Card"
              name="paymentMethod"
              value="Card"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="UPI"
              id="UPI"
              name="paymentMethod"
              value="UPI"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </div>
  );
};

export default PaymentScreen;
