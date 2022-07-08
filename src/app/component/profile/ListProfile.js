import React, { Fragment, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { getAllProfile } from "../../actions/profile";

const ListProfile = ({
  profile: { profiles, loading },
  auth: { isAuthenticated },
  getAllProfile,
}) => {
  //   const dispatch = useDispatch();

  useEffect(() => {
    if (profiles) {
      getAllProfile();
    }
  }, [loading]);

  return (
    profiles && (
      <div>
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
          <i className="fab fa-connectdevelop"></i> Browse and connect with
          developers
        </p>
        {profiles
          .filter((item1) => item1["user"] !== null)
          .map((item) => (
            <div className="profiles">
              <div className="profile bg-light">
                <div>
                  <h2>{item["user"]["name"]}</h2>
                  <p>{item["location"]}</p>
                  <p>{item["skills"].join(",")}</p>
                  <Link
                    to={`/profile/${item["user"]["_id"]}`}
                    className="btn btn-primary"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    )
  );
};

ListProfile.propTypes = {
  getAllProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getAllProfile })(ListProfile);
