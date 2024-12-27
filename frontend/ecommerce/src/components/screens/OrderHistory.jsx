import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../actions/productsActions";
import {
  Button,
  Table,
  Spinner,
  Alert,
  Container,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderHistory = useSelector((state) => state.orderHistory);
  const { loading, orders = [], error } = orderHistory;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(getOrderHistory());
    }
  }, [dispatch, userInfo]);

  return (
    <Container className="my-5">
      <h2 className="mb-4">Order History</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">Error: {error}</Alert>
      ) : orders?.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Payment Method</th>
              <th>Items Price</th>
              <th>Shipping Price</th>
              <th>Tax Price</th>
              <th>Total Price</th>
              <th>Paid</th>
              <th>Paid At</th>
              <th>Shipping Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.paymentMethod}</td>
                <td>${order.itemsPrice}</td>
                <td>${order.shippingPrice}</td>
                <td>${order.taxPrice}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <Badge bg="success">Paid</Badge>
                  ) : (
                    <Badge bg="danger">Not Paid</Badge>
                  )}
                </td>
                <td>
                  {order.paidAt
                    ? new Date(order.paidAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  {order.shippingAddress
                    ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.zipCode}`
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">No orders have been made yet.</Alert>
      )}
      <br></br>
      <div>
        {" "}
        <Button
          variant="primary"
          onClick={() => navigate("/")}
          size="lg"
          className="mx-2"
        >
          Continue Shopping
        </Button>
      </div>
    </Container>
  );
};

export default OrderHistory;
