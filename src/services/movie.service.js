import axios from "axios";

class MovieService {
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
  //update user
  updateUser = async (requestBody) => {
    console.log(requestBody);
    return this.api.put("/api/users/current", requestBody);
  };

  // POST /api/examples
  createOne = async (requestBody) => {
    return this.api.post("/api/movies", requestBody);
  };

  // GET /api/examples
  getAll = async () => {
    return this.api.get("/api/movies");
  };

  // GET /api/examples/:id
  getOne = async (id) => {
    return this.api.get(`/api/movies/${id}`);
  };

  // PUT /api/examples/:id
  updateOne = async (id, requestBody) => {
    return this.api.put(`/api/movies/${id}`, requestBody);
  };

  // DELETE /api/examples/:id
  deleteMovie = async (id) => {
    return this.api.delete(`/api/movies/${id}`);
  };

  // POST /api/
  uploadImage = async (requestBody) => {
    return this.api.post("/api/upload", requestBody);
  };

  //get wishlist

  watchOne = async (id) => {
    return this.api.put("/api/users/wishlist", id);
  };

  //seen movies
  seenOne = async (id) => {
    return this.api.put("/api/users/watched-movie", id);
  };
}

// Create one instance of the service
const movieService = new MovieService();

export default movieService;
