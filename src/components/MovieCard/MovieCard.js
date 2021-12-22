//import { Link } from "react-router-dom";//
import Card from "react-bootstrap/Card";
//import { Button } from "react-bootstrap";//
import "./../MovieCard/MovieCard.css";
import { Row } from "react-bootstrap/";
import { Col } from "react-bootstrap/";

// We are deconstructing props object directly in the parentheses of the function
function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Row xs={0} md={1} className="g-4">
        {Array.from({ length: 1 }).map((_, idx) => (
          <Col>
            <Card>
              <Card.Img variant="top" src={movie.img} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default MovieCard;
