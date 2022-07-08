import React, { useEffect } from "react";
import { connect } from "react-redux";
import { findProfileWithUserId } from "../../actions/profile";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const Profile = ({ findProfileWithUserId, profile: { profile, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    findProfileWithUserId(id);
  }, [loading]);

  return (
    profile && (
      <div>
        <Link to="/profile" className="btn btn-light">
          Back To Profiles
        </Link>
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{profile["user"]["name"]}</h2>
          <p></p>
          <div className="line">Email : {profile["user"]["email"]}</div>
          <h2 className="text-primary">Birth : {profile["user"]["birth"]}</h2>
          <div className="skills">Skills : {profile["skills"].join(",")}</div>
        </div>

        <div className="profile-exp bg-white p-2">
          <div>
            <h2 className="text-primary">Experience</h2>
            {profile.experience.map((item) => (
              <div>
                <h3 className="text-dark">{item["company"]}</h3>
                <p>
                  {item["from"]}-{item["to"]}
                </p>
                <p>
                  <strong>Position: </strong>
                  {item["title"]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

Profile.propTypes = {
  findProfileWithUserId: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { findProfileWithUserId })(Profile);
