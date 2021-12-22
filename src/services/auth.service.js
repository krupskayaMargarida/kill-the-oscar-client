import axios from "axios";

class AuthService {
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

  login = async (requestBody) => {
    // return axios.post("http://localhost:5006/auth/login");
    return this.api.post("/auth/login", requestBody); // http://localhost:5006 /auth/login
    /* return axios.post(
      "https://kill-the-oscar.herokuapp.com/auth/login",
      requestBody
    ); */
  };

  signup = async (requestBody) => {
    // return axios.post("http://localhost:5006/auth/singup");
    return this.api.post("/auth/signup", requestBody);
  };

  verify = async () => {
    // return axios.post("http://localhost:5006/auth/verify");
    return this.api.get("/auth/verify");
  };

  userInfo = async (userId) => {
    // return axios.post("http://localhost:5006/api/users/:userId");
    return this.api.get(`/api/users/${userId}`);
  };
}

// Create one instance of the service
const authService = new AuthService();

export default authService;
