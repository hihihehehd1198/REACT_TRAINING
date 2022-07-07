import React from "react";
import { Link } from "react-router-dom";

const DashboardAction = ({ ...props }) => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/edit-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Add Experience
      </Link>
      <button onClick={props["deleteAllExp"]} className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> delete all experience
      </button>
    </div>
  );
};

export default DashboardAction;
