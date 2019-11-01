import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addContact} from "../actions/authActions";
import classnames from "classnames";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/input'


class Details extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      number: "",
      errors: {}
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const newContact = {
      name: this.state.name,
      number: this.state.number
    };
    this.props.addContact(newContact, this.props.history);
  };
  render() {
    const {errors} = this.state;
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
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
              <label htmlFor="name">Name</label>
                <span className="red-text">
                  {errors.name}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <PhoneInput
                  onChange={ number => this.setState({ number }) }
                  value={ this.state.number }
                  erro={errors.number}
                  id = "number"
                  type = "tel"
                  className={classnames("", {
                    invalid: errors.number
                  })}
                  />
                <p>{this.state.number}</p>
                <label htmlFor="number">Phone Number</label>
                <span className="red-text">
                  {errors.number}
                  {errors.numberincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Details.propTypes = {
  addContact: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {addContact})(Details);
