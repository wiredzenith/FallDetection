import React, { Component } from "react";
import { Link } from "react-router-dom";


class Navbar extends Component {
  render() {
    return (
        <nav>
          <div className="nav-wrapper white">
            <Link to="/"style={{fontFamily: "monospace"}}
            className="brand-logo black-text">
            <i className="material-icons">code</i>MERN</Link>
            <ul id="nav-mobile" className=" right hide-on-med-and-down">
              <li><Link to= "/Dashboard" className=" black-text">Dashboard</Link></li>
              <li><Link to= "/Details" className=" black-text">Details</Link></li>
              <li><Link to= "/Numbers" className=" black-text">Numbers</Link></li>
            </ul>
          </div>
        </nav>
    );
  }
}
export default Navbar;
