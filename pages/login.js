import React, { Component } from "react";
import Router from "next/router";

import styles from "./styles/signup.module.scss";
import Layout from "../utilities/layout";

import Auth from "../stores/authentication";

import { observer } from "mobx-react";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "timbudweg@gmail.com",
      password: "123456Aa",
      newPassword: false,
      forwardURL: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getInitialProps({ query }) {
    return { query };
  }

  componentDidMount() {
    const email = this.props.query && this.props.query.email;
    if (email) {
      this.setState({ email });
    }
    const forwardURL = this.props.query && this.props.query.forwardURL;
    if (forwardURL) {
      this.setState({ forwardURL });
    }
  }
  onSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    Auth.getUserStore().login({
      cb: (err, result) => {
        if (err) {
          if (err.code == "NotAuthorizedException") {
            console.log("user not authorized, incorrect username or password");
            //TODO show error
            return;
          }
          //TODO show user error
        } else {
          if (this.state.forwardURL) {
            Router.push(forwardURL);
          } else {
            Router.push("/");
          }
        }
      },
      email,
      password,
    });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  render() {
    const { newPassword } = this.state;
    return (
      <Layout>
        <form
          className="d-flex flex-column align-items-start"
          onSubmit={this.onSubmit}
        >
          <h3>Login</h3>

          <div className="form-group">
            <label>Emailadresse</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Passwort</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="d-flex flex-column">
            <div className="w-100">
              <button type="submit" className="btn btn-primary btn-block">
                Anmelden
              </button>
            </div>
            <div>
              <p className="forgot-password text-right mt-3">
                Noch nicht registriert? <a href="/signup">Hier registrieren</a>
              </p>
            </div>
          </div>
        </form>
      </Layout>
    );
  }
}

export default observer(SignUp);
