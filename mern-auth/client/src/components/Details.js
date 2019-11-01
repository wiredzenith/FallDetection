import React, { Component } from "react";
//import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addContact} from "../actions/authActions";
import classnames from "classnames";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

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
      <div className="row">
        <div className="col s12" style={{
            paddingLeft: "11.250px"
          }}>
          <h4>
            Emergency contact info
          </h4>
          <p className="grey-text text-darken-1">
            Add your contact info here to be notified in case of an emergency
          </p>
        </div>
        <form className="col s8 offset-s2" noValidate onSubmit={this.onSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
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
              <label for="icon_prefix">First Name</label>
            </div>
            <div className="input-field col s6 ">
              <PhoneInput
                flags={flags}
                placeholder="Enter phone number"
                value={ this.state.value }
                onChange={ value => this.setState({ value }) }
                className={classnames("", {
                  invalid: errors.number
                })}
                />
            </div>
          </div>
          <div className="col s12" style={{
              paddingLeft: "11.250px"
            }}>
            <button style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }} type="submit" className="btn btn-large waves-effect waves-light hoverable blue accent-3">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>);
  }
}
Details.propTypes = {
  addContact: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps, {addContact})(Details);
