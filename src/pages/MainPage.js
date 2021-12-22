import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import CommentCard from "../components/CommentCard/CommentCard";
import movieService from "../services/movie.service";
import commentService from "../services/comment.service";
import { Link } from "react-router-dom";

function MainPage() {
  const [movies, setMovies] = useState([]);
  const [comments, setComments] = useState([]);

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchMovies = await movieService.getAll();
        const fetchComments = await commentService.topComments();
        setMovies(fetchMovies.data);
        setComments(fetchComments.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>

      <h3 className="Reviews"> ALL MOVIES </h3>

      <hr></hr>
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: "5%",
        }}
      >
        {movies.map((movie) => (
          <Link to={`/movies/movie-details/${movie._id}`}>
            <MovieCard key={movie._id} movie={movie} />
          </Link>
        ))}
      </div>
      <br></br>
      <br></br>
      <br></br>

      <h3 className="Reviews"> TOP REVIEWS </h3>
      <hr></hr>
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </div>
  );
}

export default MainPage;
