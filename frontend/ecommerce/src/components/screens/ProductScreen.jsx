import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Container,
  ListGroupItem,
  FormControl,
  Form,
} from "react-bootstrap";
import Rating from "../Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productsActions";
import Loader from "../Loader";
import Message from "../Message";

function ProductScreen({ params }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [qty, SetQty] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const productsDetails = useSelector((state) => state.productsDetails);
  const { errors, loading, product } = productsDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, params]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };
  return (
    <Container>
      <div>
        <Link to="/" className="btn btn-dark my-3">
          Go Back{" "}
        </Link>
        {loading ? (
          <Loader />
        ) : errors ? (
          <Message variant="danger">{errors}</Message>
        ) : (
          <Row>
            <Col md={6}>
              <Image
                src={`http://localhost:8000/${product.image}`}
                alt={product.name}
                fluid
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.productname}</h3>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>Brand : {product.productbrand} </ListGroup.Item>
              <ListGroup.Item>
                Description : {product.productinfo}
              </ListGroup.Item>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.stockcount > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.stockcount > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl
                            as="select"
                            value={qty}
                            onChange={(e) => SetQty(e.target.value)}
                          >
                            {[...Array(product.stockcount).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      disabled={product.stockcount == 0}
                      type="button"
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
}

export default ProductScreen;
