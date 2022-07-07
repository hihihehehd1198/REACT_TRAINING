import React, { Fragment, useState, useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addOrEditExp } from "../../actions/profile";
import { Link, withRouter } from "react-router-dom";
const EditExperience = ({ addOrEditExp, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    from: "",
    to: "",
  });
  const { title, company, from, to } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addOrEditExp(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            value={title}
            type="text"
            onChange={onChange}
            placeholder="* Job Title"
            name="title"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={company}
            onChange={onChange}
            placeholder="* Company"
            name="company"
            required
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" value={from} onChange={onChange} name="from" />
        </div>

        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" value={to} name="to" onChange={onChange} />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditExperience.propTypes = {
  addOrEditExp: PropTypes.func.isRequired,
};

export default connect(null, { addOrEditExp })(withRouter(EditExperience));
