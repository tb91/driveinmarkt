import { observable, computed, action, flow, configure } from "mobx";
configure({ enforceActions: "observed" });
import axios from "axios";

import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import aws_exports from "../aws-exports";
Amplify.configure(aws_exports);

const API_ROOT_URL = process.env.API_ROOT_URL
  ? process.env.API_ROOT_URL
  : console.log("API_ROOT_URL does not exist.");

class UserStoreImpl {
  @observable email;
  @observable loggedIn;
  userObjectCognito;

  checkTokenValid = flow(function* (cb) {
    try {
      if (!localStorage.getItem("token")) {
        return cb("no token available");
      }
      const res = yield axios.get(`${API_ROOT_URL}auth/checkAndRenewToken`, {
        headers: { authentication: localStorage.getItem("token") },
      });

      this.email = res.data.email;

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      this.loggedIn = true;
      cb(null, true);
    } catch (error) {
      console.log(error);
      cb(error);
    }
  });

  checkAuthenticated = flow(function* (cb) {
    try {
      const tokens = yield Auth.currentSession();

      return cb(null, tokens);
    } catch (error) {
      return cb(error, null);
    }
  });

  @action signup = flow(function* ({
    cb,
    username,
    password,
    firstName,
    lastName,
  }) {
    try {
      console.log(username, password, firstName, lastName);
      const res = yield Auth.signUp(
        {
          username,
          password,
        },
        { validationData: [] }
      );
      console.log("RES:", res);
      //localStorage.setItem("");
      this.loggedIn = true;
      this.userObjectCognito = res;
      cb(null, res);
    } catch (error) {
      console.log(error);
      cb(error);
    }
  });

  @action confirmAccount = flow(function* ({ cb, confirmationCode, email }) {
    try {
      const result = yield Auth.confirmSignUp(email, confirmationCode);
      cb(null, result);
    } catch (error) {
      console.log(error);
      cb(error);
    }
  });

  @action newPasswordRequired = flow(function* ({
    email,
    password,
    cognitoUser,
  }) {
    try {
      const loggedUser = yield Auth.completeNewPassword(
        // insecurely set same password
        user, // the Cognito User Object
        password, // the new password
        // OPTIONAL, the required attributes
        {
          email,
        }
      );
      cb(null, loggedUser);
    } catch (error) {
      cb(error);
    }
  });

  @action login = flow(function* ({ email, password, cb }) {
    try {
      const user = yield Auth.signIn(email, password);
      console.log("user:", user);
      if (
        user.challengeName === "SMS_MFA" ||
        user.challengeName === "SOFTWARE_TOKEN_MFA"
      ) {
        console.log(
          "AWS requires MFA but client implementation is not done yet."
        );
      } else if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
        // You need to get the new password and required attributes from the UI inputs
        // and then trigger the following function with a button click
        // For example, the email and phone_number are required attributes
        // const { username, password } = getInfoFromUserInput();
      } else if (user.challengeName === "MFA_SETUP") {
        // This happens when the MFA method is TOTP
        // The user needs to setup the TOTP before using it
        // More info please check the Enabling MFA part
        Auth.setupTOTP(user);
      } else {
        // The user directly signs in
        console.log(user);
      }
      this.signInUserSession = user.signInUserSession;
      cb(null, true);
    } catch (err) {
      if (err.code === "UserNotConfirmedException") {
        // The error happens if the user didn't finish the confirmation step when signing up
        // In this case you need to resend the code and confirm the user
        // About how to resend the code and confirm the user, please check the signUp part
      } else if (err.code === "PasswordResetRequiredException") {
        // The error happens when the password is reset in the Cognito console
        // In this case you need to call forgotPassword to reset the password
        // Please check the Forgot Password part.
      } else if (err.code === "NotAuthorizedException") {
        // The error happens when the incorrect password is provided
      } else if (err.code === "UserNotFoundException") {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
      } else {
        //console.log(err);
      }
      console.log(err);
    }
  });

  get getUser() {
    return { email, loggedIn };
  }

  @action delete() {
    console.log("UserStore. logging out");
    this.email = null;
    this.level = null;
    this.visitedProblems = null;
    this.loggedIn = false;
  }
}

export default class UserStore {
  static userStore;
  static getUserStore() {
    if (!this.userStore) {
      this.userStore = new UserStoreImpl();
    }
    return this.userStore;
  }
}
