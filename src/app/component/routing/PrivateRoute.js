import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  return (
    <nav>
      <Route
        {...rest}
        render={(props) =>
          !isAuthenticated && !loading ? (
            <Redirect to="/login" />
          ) : (
            <Component {...props} />
          )
        }
      />
    </nav>
  );
};
PrivateRoute.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(PrivateRoute);
