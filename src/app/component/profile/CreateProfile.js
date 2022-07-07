import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";

import { createProfile } from "../../actions/profile";
import { Link } from "react-router-dom";
const CreateProfile = ({ profile: { profile, loading }, history }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const { company, skills, location } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData, history));
  };

  useEffect(() => {
    if (profile) {
      //   console.log({ ...profile });
      setFormData({ ...profile });
    }
  }, [profile]);
  return (
    <div>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      {/* <small>* = required field</small> */}
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            required
            onChange={onChange}
            type="text"
            value={company}
            placeholder="Company"
            name="company"
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>

        <div className="form-group">
          <input
            required
            onChange={onChange}
            type="text"
            value={location}
            placeholder="Location"
            name="location"
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            required
            onChange={onChange}
            type="text"
            value={skills}
            placeholder="* Skills"
            name="skills"
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        {/* <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div> */}

        <input
          type="submit"
          className="btn btn-primary my-1"
          value="createProfile"
        />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};
CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {})(CreateProfile);
