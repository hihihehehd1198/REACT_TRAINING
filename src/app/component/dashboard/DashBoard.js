import React, { Fragment, useLayoutEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import Experience from "./Experience";
import DashboardAction from "./DashboardAction";
import {
  deleteAllExp,
  deleteCurrentAccount,
  getProfileWithId,
} from "../../actions/profile";
import SpinnerComponent from "../layout/spinner";

const DashBoard = ({
  deleteAllExp,
  deleteCurrentAccount,
  auth: { user },
  profile: { profile, loading },
  history,
}) => {
  const dispatch = useDispatch();
  const resetKey = useRef(0);
  useLayoutEffect(() => {
    console.log(resetKey);
    if (user) {
      getListProfile();
    }
  }, [user, resetKey.current]);
  const getListProfile = () => {
    dispatch(getProfileWithId(user["user"]["_id"]));
  };
  const resetKeyFunc = () => {
    console.log("delete");
    resetKey.current = Math.random() * 100;
  };
  useLayoutEffect(() => {
    console.log(profile);
  }, [profile]);

  return loading && profile === null ? (
    <SpinnerComponent />
  ) : (
    <Fragment key={resetKey.current}>
      <nav className="">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user.user.name || ""}
        </p>
        {profile !== null ? (
          <Fragment>
            <DashboardAction
              deleteAllExp={() => {
                deleteAllExp();
                resetKeyFunc();
              }}
            />
            {console.log(profile, profile.experience)}
            {profile !== null && profile.experience !== null ? (
              <Experience
                experience={profile.experience}
                onDeleteFunc={() => {
                  resetKeyFunc();
                }}
              />
            ) : (
              ""
            )}
            {/* <Education education={profile.education} /> */}

            <div className="my-2">
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteCurrentAccount(history);
                }}
              >
                <i className="fas fa-user-minus" /> Delete My Account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not setup profile , please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              create Profile
            </Link>
          </Fragment>
        )}
      </nav>
    </Fragment>
  );
};
DashBoard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteCurrentAccount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { deleteAllExp, deleteCurrentAccount })(
  DashBoard
);
