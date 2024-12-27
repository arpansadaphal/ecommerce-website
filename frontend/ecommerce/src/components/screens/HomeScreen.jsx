import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import Product from "../Product";
import { listProducts } from "../../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";

function HomeScreen() {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productsList);
  const { errors, loading, products } = productsList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Container>
      <br />
      <h1>Products</h1>
      {loading ? (
        <Loader />
      ) : errors ? (
        <Message variant="danger">{errors}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default HomeScreen;
