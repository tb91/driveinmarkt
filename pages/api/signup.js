const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,
});

const dynamodb = new AWS.DynamoDB();

const signup = (req, res)=>{
  const {user} = req.body;

  if (!validateUser(user)) {
    res.status(400);
    res.send('User object does not exist or does ' +
             'not contain an email and a password.');
    return;
  }
  const userToInsert={};
  userToInsert.email={S: user.email};
  userToInsert.password={S: user.password};
  return new Promise((resolve, reject)=>{
    // Check for existing email.
    dynamodb.getItem(
        {TableName: 'users', Key: {email: {S: user.email}}},
        function(err, data) {
          if (err) {
            res.status(500);
            res.send('error:'+err);
            reject(err);
          } else {
            // If user does not exist yet create dataset.
            if (!data || !data.Item) {
              dynamodb.putItem({TableName: 'users',
                Item: userToInsert}, function(err, user) {
                if (err) {
                  res.status(500);
                  res.send(err);
                  reject(err);
                } else {
                  res.status(200);
                  res.send('Success');
                  resolve();
                }
              });
            } else {
              res.status(500);
              res.send(err);
              reject(err);
            }
          }
        });
  });
};


const validateUser=(user)=>{
  if (!user) {
    return false;
  }
  if (!user.email || !user.password) {
    return false;
  }
  return true;
};

export default signup;
