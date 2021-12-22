import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import movieService from "../../services/movie.service";

function AddMovie() {
  const [imageUrl, setImageUrl] = useState("");

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
    <div className="SignupPage" style={{ padding: "20px" }}>
      <Formik
        initialValues={{
          title: "",
          director: "",
          description: "",
          rating: "",
          year: "",
          genre: "",
        }}
        onSubmit={async (values) => {
          try {
            await movieService.createOne({ ...values, img: imageUrl });
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
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  isValid={touched.title && !errors.title}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Director</Form.Label>
                <Form.Control
                  type="text"
                  name="director"
                  value={values.director}
                  onChange={handleChange}
                  isValid={touched.director && !errors.director}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  name="genre"
                  value={values.genre}
                  onChange={handleChange}
                  //isValid={touched.genre && !errors.genre}
                >
                  <option>Select the genre</option>
                  <option value="Romance">Romance</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Animation">Animation</option>
                  <option value="Crime">Crime</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="text"
                  name="rating"
                  value={values.rating}
                  onChange={handleChange}
                  isValid={touched.rating && !errors.rating}
                />
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="text"
                  name="year"
                  value={values.year}
                  onChange={handleChange}
                  isValid={touched.year && !errors.year}
                />
              </Form.Group>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="img"
                  onChange={handleFileUpload}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="4">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  type="text"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  isValid={touched.description && !errors.description}
                />
              </Form.Group>
            </Row>
            <Button type="submit">Create movie</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddMovie;
