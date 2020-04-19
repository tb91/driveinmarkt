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
      firstName: "tim",
      lastName: "name",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { email, password, firstName, lastName } = this.state;

    Auth.getUserStore().signup({
      cb: (err, result) => {
        if (err) {
          //TODO display error to user
          console.log(err);
          return;
        }
        if (!result.userConfirmed) {
          Router.push({
            pathname: "/confirmSignup",
            query: { email: result.user.username },
          });
        }
      },
      username: email,
      password,
      firstName,
      lastName,
    });
  }
  render() {
    return (
      <Layout>
        <form
          className="d-flex flex-column align-items-start"
          onSubmit={this.handleSubmit}
        >
          <h3>Registrieren</h3>

          <div className="form-group">
            <label>Vorname</label>
            <input
              id="firstName"
              type="text"
              className="form-control"
              placeholder="Vorname"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Nachname</label>
            <input
              id="lastName"
              type="text"
              className="form-control"
              placeholder="Nachname"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Email"
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
              placeholder="Passwort"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="d-flex flex-column">
            <div className="w-100">
              <button type="submit" className="btn btn-primary btn-block">
                Registrieren
              </button>
            </div>
            <div>
              <p className="forgot-password text-right mt-3">
                Schon registriert? <a href="/login">Hier anmelden</a>
              </p>
            </div>
          </div>
        </form>
      </Layout>
    );
  }
}

export default observer(SignUp);
