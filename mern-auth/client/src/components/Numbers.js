import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getNumbers } from "../actions/authActions";

class Numbers extends Component {
  onLogoutClick = e => {
    e.preventDefault();
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }
render() {
const { user } = this.props.auth;
return (
  <div className="container">
    <div style={{ marginTop: "4rem" }} className="row">
      <div className="col s8 offset-s2">
        <Link to="/" className="btn-flat waves-effect">
          <i className="material-icons left">keyboard_backspace</i> Back to
          home
        </Link>
        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
          <h4>
          Contact details
          </h4>
          <p className="grey-text text-darken-1">
            Add emergency contacs below to be notified if an emergency occurs.
          </p>
        </div>
        <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.name}</td>
            <td>+353 20 769 4839</td>
          </tr>
          <tr>
            <td>{user.name}</td>
            <td>+353 20 919 4839</td>
          </tr>
          <tr>
            <td>{user.name}</td>
            <td>+353 20 918 6136</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
    );
  }
}
Numbers.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getNumbers }
)(Numbers);
