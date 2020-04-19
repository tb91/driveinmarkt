const aws_config = {
  Auth: {
    // Amazon Cognito Region
    region: "YOUR REGION",

    // Amazon Cognito User Pool ID
    userPoolId: "YOUR POOL ID",

    // Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "YOUR CLIENT ID",
  },
};

export default aws_config;
