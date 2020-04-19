import React, { Component } from "react";
import styles from "./styles/signup.module.scss";
import Layout from "../utilities/layout";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = { email: "t.imbudweg@gmail.com", newPassword: "123456aA" };
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  async onClick(event) {
    event.preventDefault();
    const { email, password } = this.state;
    Auth.getUserStore().login({
      cb: (err, result) => {
        console.log(err, result);
      },
      email,
      password,
    });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  render() {
    return (
      <Layout>
        <form className="d-flex flex-column align-items-start">
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
              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={this.onClick}
              >
                Einloggen
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
