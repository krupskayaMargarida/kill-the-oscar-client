import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Get the value from the context
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="Navbar">
      <div className="kill">
        <h3>KILL THE OSCAR </h3>
      </div>
      <Link to="/">
        <button className="Button">Home</button>
      </Link>
      <Link to="/home">
        <button className="Button">Movies</button>
      </Link>
      {
        user?.role === "admin" &&
        <Link to="/movies/add-movie">
          <button className="Button">Add a Movie</button>
        </Link>
      }
      {isLoggedIn && (
        <>
          <button className="Button" onClick={logOutUser}>
            Logout
          </button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button className="Button">Sign Up</button>
          </Link>

          <Link to="/login">
            <button className="Button">Login</button>
          </Link>
        </>
      )}

      <div className="profile-img-wrapper">
        {user && (
          <Link to={`/profile/${user._id}`}>
            <img className="profile-img" src={user.image} alt="profile" />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
