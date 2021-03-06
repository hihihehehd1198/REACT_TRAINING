import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";
import { deleteExpWithId } from "../../actions/profile";
const Experience = ({ experience, deleteExpWithId, onDeleteFunc }) => {
  //   useEffect(() => {
  //     console.log(experience);
  //   }, [experience]);
  const experiences =
    experience &&
    experience.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{" "}
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => {
              onDeleteFunc();
              deleteExpWithId(exp._id);
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExpWithId: PropTypes.func.isRequired,
};
export default connect(null, { deleteExpWithId })(Experience);
