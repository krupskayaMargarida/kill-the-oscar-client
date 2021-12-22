import { useState, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import movieService from "../../services/movie.service";
import { AuthContext } from "../../context/auth.context";

function EditProfilePage() {
  const [imageUrl, setImageUrl] = useState("");
  const { logInUser } = useContext(AuthContext);

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    movieService
      .uploadImage(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "secure_url" which we can use to update the state
        setImageUrl(response.data.secure_url);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Formik
        //validationSchema={schema}
        initialValues={{
          name: "",
          aboutMe: "",
          birthDate: "",
          country: "",
          image: "",
        }}
        onSubmit={async (values) => {
          try {
            const response = await movieService.updateUser({
              ...values,
              image: imageUrl,
            });
            const newToken = response.data.authToken;
            logInUser(newToken);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          isValid,
          errors,
          setFieldValue,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={values.country}
                  s
                  onChange={handleChange}
                  isValid={touched.country && !errors.country}
                />
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                  type="text"
                  name="birthDate"
                  value={values.birthDate}
                  onChange={handleChange}
                  isValid={touched.birthDate && !errors.birthDate}
                />
              </Form.Group>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleFileUpload}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="4">
                <Form.Label>About me</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  type="text"
                  name="aboutMe"
                  value={values.aboutMe}
                  onChange={handleChange}
                  isValid={touched.aboutMe && !errors.aboutMe}
                />
              </Form.Group>
            </Row>
            <Button type="submit">Create Perfil</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditProfilePage;
