import axios from "axios";

class CommentService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5006",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // GET /api/examples
  getAll = async () => {
    return this.api.get("/api/allComments");
  };

  // GET /api/examples
  getMovieComments = async (movieId) => {
    return this.api.get(`/api/comments/${movieId}`);
  };

  // GET /api/examples
  topComments = async () => {
    return this.api.get("/api/topComments");
  };

  createOne = async (comment, movieId) => {
    return this.api.post(`/api/add-comment/${movieId}`, comment);
  };
}

// Create one instance of the service
const commentService = new CommentService();

export default commentService;
