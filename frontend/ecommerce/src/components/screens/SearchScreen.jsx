import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Card, Button, Image, Spinner } from "react-bootstrap";
import { getSearchResults } from "../../actions/productsActions";
import Message from "../Message";

const SearchScreen = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        setLoading(true);
        setError("");
        try {
          const data = await getSearchResults(query);
          setResults(data);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch search results");
          setLoading(false);
        }
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div style={{ padding: "20px" }}>
      <h1
        className="mb-4 text-center"
        style={{ fontSize: "2rem", fontWeight: "600", color: "#333" }}
      >
        Search Results
      </h1>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spinner animation="border" role="status" />
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : results.length === 0 ? (
        <Message>No products found</Message>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} xl={5}>
          {results.map((product) => (
            <Col key={product._id} className="mb-4">
              <Card className="shadow-sm">
                <div
                  style={{
                    height: "250px",
                    overflow: "hidden",
                    borderRadius: "10px",
                  }}
                >
                  <Image
                    src={`http://localhost:8000/${product.image}`}
                    alt={product.productname}
                    style={{
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                    }}
                    fluid
                  />
                </div>
                <Card.Body>
                  <Card.Title
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    {product.productname}
                  </Card.Title>
                  <Card.Text style={{ fontSize: "0.875rem", color: "#555" }}>
                    {product.productinfo.slice(0, 90)}...
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#d9534f",
                      }}
                    >
                      ${product.price}
                    </span>
                    <div style={{ fontSize: "0.875rem", color: "#f8b700" }}>
                      <span>{product.rating}</span> ({product.numReviews}{" "}
                      reviews)
                    </div>
                  </div>
                  <Button variant="primary" className="w-100 mt-3">
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default SearchScreen;
