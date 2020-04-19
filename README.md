# Drivein market

This project enables owners of closed stores due to Covid19 to continue business.
The shop can upload their products and sell them in the app. 
Afterwards they do a pickup of the goods.
You can find out more in this google doc: https://docs.google.com/document/d/1G9uAPkLCmhegFRlGwNS-e9SRGRsJTHRu23diM0FPFis/edit?usp=sharing



## How to Use

npm install
npm install -g next
npm start

## Setup

This project used create-next-app to create a new next app and integrates serverless framework to push APIs to AWS Lambda.
An environment variable storing the essential AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY is required to use serverless.
Also next is configured to use serverless using the "serverless-next.js" npm package. Make sure that you use their severless 
configuration and not the "usual" one with provider.


## Run Jest Tests

--> not available right now.
```bash
npm test
```
