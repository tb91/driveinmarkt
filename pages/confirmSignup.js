import React, { Component } from "react";
import styles from "./styles/signup.module.scss";
import Layout from "../utilities/layout";

import Auth from "../stores/authentication";

import Router from "next/router";

import { observer } from "mobx-react";

class ConfirmSignup extends Component {
  constructor() {
    super();
    this.state = {
      confirmation: "",
      email: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getInitialProps({ query }) {
    return { query };
  }

  componentDidMount() {
    const email = this.props.query && this.props.query.email;
    if (email) {
      this.setState({ email });
    }
    const confirmation = this.props.query && this.props.query.confirmationCode;
    if (confirmation) {
      this.setState({ confirmation });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { confirmation, email } = this.state;

    Auth.getUserStore().confirmAccount({
      cb: (err, result) => {
        console.log("RESULT:", result);
        if (err) {
          if (err.code == "NotAuthorizedException") {
            console.log("already authorized or wrong code.");
            //TODO send user message
          } else if (err.code == "CodeMismatchException") {
            //TODO send user message.
            console.log("wrong code");
          }
        } else {
          if (result == "SUCCESS") {
            Router.push({ pathname: "/", query: { email } });
          }
        }
      },
      email,
      confirmationCode: confirmation,
    });
  }
  render() {
    return (
      <Layout>
        <form
          className="d-flex flex-column align-items-start"
          onSubmit={this.handleSubmit}
        >
          <h3>Email Adresse bestätigen</h3>
          <p>
            Wir haben an deine Emailadresse einen Code geschickt. Gib ihn bitte
            hier ein. Bitte prüfe auch deinen Spam Ordner.
          </p>
          <p>
            Falls du immer noch keinen Code finden kannst, fordere{" "}
            <a href="">hier</a> einen neuen an.
          </p>

          <div className="form-group">
            <label>Bestätigungscode</label>
            <input
              id="confirmation"
              type="text"
              className="form-control"
              placeholder="Bestätigungscode"
              value={this.state.confirmation}
              onChange={this.handleChange}
            />
          </div>

          <div className="d-flex flex-column">
            <div className="w-100">
              <button type="submit" className="btn btn-primary btn-block">
                Bestätigen
              </button>
            </div>
          </div>
        </form>
      </Layout>
    );
  }
}

export default observer(ConfirmSignup);
