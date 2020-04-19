import React, { Component } from "react";

import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import aws_exports from "../../aws-exports";

Amplify.configure(aws_exports);

import Login from "../../pages/login";
import UserStore from "../../stores/authentication";

function withAuth(WrappedComponent, selectData) {
  return class AuthenticationHOC extends Component {
    isAuthenticated() {
      return false;
    }
    render() {
      if (this.isAuthenticated()) {
        return (
          <WrappedComponent auth={{ name: "to be done", email: "whatever" }} />
        );
      } else {
        return <Login />;
      }
    }
  };
}

export default withAuth;
