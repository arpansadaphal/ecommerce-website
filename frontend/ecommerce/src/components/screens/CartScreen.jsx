import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { addToCart, RemoveFromCart } from "../../actions/cartActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CartScreen = () => {
  const { id: productId } = useParams(); // Extract "id" from URL
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(productId, qty);
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const RemoveFromCartHandler = (id) => {
    dispatch(RemoveFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  if (!Array.isArray(cartItems)) {
    console.error("cartItems is not an array", cartItems);
    return <div>No items in the cart</div>;
  }
  console.log(cartItems);
  return (
    <Row>
      <Col md={8}>
        <Container>
          <h1>Cart Items</h1>
          {cartItems && cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty<Link to="/">Go back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems?.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={`http://localhost:8000/${item.image}`}
                        alt={item.productname}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>Rs.{item.price}</Col>
                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.stockcount).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => RemoveFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          <Button
            onClick={() => navigate("/checkout")}
            disabled={cartItems.length === 0}
            className="mt-3 "
          >
            Proceed to Checkout
          </Button>
          <Button onClick={() => navigate("/")} className="mt-3 ">
            Shop more
          </Button>
        </Container>
      </Col>
    </Row>
  );
};

export default CartScreen;
