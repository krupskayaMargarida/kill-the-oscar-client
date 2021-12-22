// We are deconstructing props object directly in the parentheses of the function
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams } from "react-router-dom";
import authService from "../../services/auth.service";
import "./../ProfilePage/ProfilePage.css";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ProfilePage() {
  const [value, setValue] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  let { user } = useContext(AuthContext);
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate("/edit-profile");
  };
  // criar variavel useState filme seen e faved
  // useEffect chamas cada um via axios set para cada respectivo
  // map no sitio respectivo
  // style

  const getUser = async (id) => {
    try {
      const response = await authService.userInfo(id);
      setUserProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div class="profile">
        <div class="container bootdey">
          <hr />
          <div class="wrap clearfix">
            <div className="image-profile">
              <img src={userProfile?.image} class="img-thumbnail" alt="" />
              <div style={{display: "flex", alignItems: "center", marginLeft: "1rem", marginTop: "2rem"}}>
                <h4>{userProfile?.name}</h4>
                {user && userId === user._id && 
                  <IconButton onClick={handleClickEdit}>
                    <EditIcon />
                  </IconButton>
                }
              </div>
            </div>
            <div class="col-sm-8 col-xs-12">
              <div class="col-xs-12 content">
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Seen" {...a11yProps(0)} />
                    <Tab label="Wishlist" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                {userProfile && userProfile.watchedMovie.map((movie) => (
                  <Link to={`/movies/movie-details/${movie._id}`}>
                    <img src={movie.img} alt={movie.title} width="100px" height="100px"/>
                  </Link>
                ))}
                </TabPanel>
                <TabPanel value={value} index={1}>
                {userProfile && userProfile.toWatch.map((movie) => (
                  <Link to={`/movies/movie-details/${movie._id}`}>
                    <img src={movie.img} alt={movie.title} width="100px" height="100px"/>
                  </Link>
                ))}
                </TabPanel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
