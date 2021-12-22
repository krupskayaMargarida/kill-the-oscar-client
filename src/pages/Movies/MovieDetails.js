//import axios from "axios";//
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CommentCard from "../../components/CommentCard/CommentCard";
import commentService from "../../services/comment.service";
import movieService from "../../services/movie.service";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { movieId } = useParams();

  const getMovie = async () => {
    try {
      const response = await movieService.getOne(movieId);
      const oneMovie = response.data;
      setMovie(oneMovie);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const response = await commentService.getMovieComments(movieId);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitComment = async () => {
    try {
      const response = await commentService.createOne(
        { text: newComment },
        movieId
      );
      setComments([...comments, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie();
    getComments();
  }, []);

  const watchMovie = async () => {
    const serverResponse = await movieService.watchOne({ movieId });
    const retreivedData = serverResponse.data;
    setMovie(retreivedData);
  };
  const seenMovie = async () => {
    const server = await movieService.seenOne({ movieId });
    const receivedData = server.data;
    setMovie(receivedData);
  };

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <div className="MovieDetails">
        {movie && (
          <>
            <figure className="movie">
              <div className="movie__hero">
                <img src={movie.img} alt="Rambo" className="movie__img" />
              </div>
              <div className="movie__content">
                <div className="movie__title">
                  <h1 className="heading__primary">
                    <br></br>
                    {movie.title} <i class="fas fa-fire"></i>
                  </h1>
                  <div className="movie__tag movie__tag--1">
                    <p>
                      <b>Genre: </b> {movie.genre}
                    </p>
                  </div>
                  <hr />
                  <p>
                    <b>Year: </b> {movie.year}
                  </p>
                  <hr />
                </div>
                <p className="movie__description">
                  <b>Description: </b>
                  {movie.description}
                </p>
                <hr />
                <div className="movie__details">
                  <p className="movie__detail">
                    <span className="icons icons-red">
                      <i className="fas fa-camera-retro"></i>{" "}
                    </span>
                  </p>
                  <p className="movie__detail">
                    <span className="icons icons-yellow">
                      <i className="fas fa-file-invoice-dollar"></i>
                    </span>
                  </p>
                </div>
              </div>
              <div className="movie__price"></div>
            </figure>

            <Link to="/">
              <button className="btndetails" onClick={watchMovie}>
                Add to WatchList
              </button>
            </Link>

            <Link to="/">
              <button className="btndetails" onClick={seenMovie}>
                Already Saw{" "}
              </button>
            </Link>

            {comments.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))}
            <br></br>
            <br></br>
            <div class="commentWriteBox">
              <TextField
                className="formulario"
                id="outlined-multiline"
                label="Comment"
                multiline
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.currentTarget.value)}
              />
              <br />
              <Button onClick={submitComment}>Submit</Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MovieDetailsPage;
