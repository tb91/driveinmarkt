/* eslint-disable indent */
const AWS = require("aws-sdk");
const crypto = require("crypto");

import * as util from "../util";

AWS.config.update({
  region: process.env.AWS_REGION
});

const dynamodb = new AWS.DynamoDB();
const ses = new AWS.SES();

function storeUser(email, password, salt, fn) {
  // Bytesize
  const len = 12;
  crypto.randomBytes(len, function(err, token) {
    if (err) return fn(err);
    token = token.toString("hex");
    dynamodb.putItem(
      {
        TableName: "users",
        Item: {
          email: {
            S: email
          },
          passwordHash: {
            S: password
          },
          passwordSalt: {
            S: salt
          },
          verified: {
            BOOL: false
          },
          verifyToken: {
            S: token
          }
        },
        ConditionExpression: "attribute_not_exists (email)"
      },
      function(err, data) {
        if (err) fn(err);
        else fn(null, token);
      }
    );
  });
}

function sendVerificationEmail(email, token, fn) {
  const subject = "Verification Email for driveinmarkt";
  const verificationLink =
    "?email=" + encodeURIComponent(email) + "&verify=" + token;
  ses.sendEmail(
    {
      Source: "driveinmarkt@gmail.com",
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Subject: {
          Data: subject
        },
        Body: {
          Html: {
            Data:
              "<html><head>" +
              '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
              "<title>" +
              subject +
              "</title>" +
              "</head><body>" +
              'Please <a href="' +
              verificationLink +
              '">click here to verify your email address</a> or copy & paste the following link in a browser:' +
              "<br><br>" +
              '<a href="' +
              verificationLink +
              '">' +
              verificationLink +
              "</a>" +
              "</body></html>"
          }
        }
      }
    },
    fn
  );
}

const signup = (req, res) => {
  const { user } = req.body;
  if (!util.validateUser(user)) {
    // guarantees user.email and user.password to exist.
    res.status(400);
    res.send();
    return;
  }
  if (user.password.length < 8) {
    res.status(400);
    res.send("Password must be at least 8 characters.");
    return;
  }

  return new Promise((resolve, reject) => {
    util.computeHash(user.password, function(err, salt, hash) {
      if (err) {
        res.status(500);
        res.send(false);
        reject(err);
      } else {
        storeUser(user.email, hash, salt, function(err, token) {
          if (err) {
            res.status(500);
            res.send(false);
            resolve(false);
          } else {
            //TODO: sendVerificationEmail(user.email, token, function(err, data) {});
            res.status(200);
            res.send(true);
            resolve(true);
          }
        });
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.send(false);
  });
};

export default signup;
