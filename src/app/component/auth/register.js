import React, { Fragment, useState } from "react";
import { connect } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import propTypes from "prop-types";
import { register } from "../../actions/auth";
// import authReducer from "../../reducers/auth";
// import { Link } from "react-router-dom";
// import { Fragment } from "react";
// import axios from "axios";
// import { createUser } from "../../service/userController";
const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      // const params = {
      //   name: name,
      //   email: email,
      //   password: password,
      // };
      // await createUser(JSON.stringify(params))
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
      register({ name, email, password });
    }
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" action="create-profile.html" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            value={name}
            type="text"
            placeholder="Name"
            name="name"
            required
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            value={email}
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            value={password}
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            value={password2}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: propTypes.func.isRequired,
  register: propTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(Register);
// export default Register
