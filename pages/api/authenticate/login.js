import crypto from "crypto";
import AWS from "aws-sdk";
import jwt from "jwt-simple";
import { computeHash, validateUser } from "../../../backend_util/util";

AWS.config.update({
  region: process.env.AWS_REGION
});

const dynamodb = new AWS.DynamoDB();

function getUser(email, fn) {
  dynamodb.getItem(
    {
      TableName: "users",
      Key: {
        email: {
          S: email
        }
      }
    },
    function(err, data) {
      if (err) return fn(err);
      else {
        if ("Item" in data) {
          var hash = data.Item.passwordHash.S;
          var salt = data.Item.passwordSalt.S;
          var verified = data.Item.verified.BOOL;
          fn(null, hash, salt, verified);
        } else {
          fn(null, null); // User not found
        }
      }
    }
  );
}

function getToken(email, verified, fn) {
  try {
    const timestamp = new Date().getTime();
    return fn(
      null,
      jwt.encode(
        {
          email,
          iat: timestamp,
          oneTime: !verified
        },
        process.env.JWT_SECRET
      )
    );
  } catch (error) {
    fn(err);
  }
}

const login = (req, res) => {
  const { user } = req.body;

  var email = user.email;
  var clearPassword = user.password;

  getUser(email, function(err, correctHash, salt, verified) {
    if (err) {
      res.status(403);
      res.send(false);
    } else {
      if (correctHash == null) {
        // User not found
        // console.log("User not found: " + email);
        res.status(403);
        res.send(false);
      } else if (!verified) {
        // User not verified
        // console.log("User not verified: " + email);
        res.status(403);
        res.send("User not verified.");
      } else {
        computeHash(clearPassword, salt, function(err, salt, hash) {
          if (err) {
            res.status(403);
            res.send(false);
          } else {
            // console.log("correctHash: " + correctHash + " hash: " + hash);
            if (hash == correctHash) {
              // Login ok
              // console.log("User logged in: " + email);
              getToken(email, verified, function(err, token) {
                if (err) {
                  res.status(403);
                  res.send(false);
                } else {
                  res.status(200);
                  res.send({ token });
                }
              });
            } else {
              // Login failed
              // console.log("User login failed: " + email);
              res.status(403);
              res.send(false);
            }
          }
        });
      }
    }
  });
};

export default login;