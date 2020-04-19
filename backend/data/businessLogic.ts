import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";

import { AppImpl } from "../implementations/AppImpl";

export const createUser: APIGatewayProxyHandler = async (event, _context) => {
  // Get data from request.
  let name, phone, email;
  if (event.queryStringParameters && event.queryStringParameters.name) {
    name = event.queryStringParameters.name;
  }
  if (event.queryStringParameters && event.queryStringParameters.phone) {
    phone = event.queryStringParameters.phone;
  }
  if (event.queryStringParameters && event.queryStringParameters.email) {
    email = event.queryStringParameters.email;
  }

  if (!email) {
    return {
      statusCode: 400,
      body: {
        error: "Email could not be found in the request but is mandatory.",
      },
    };
  }

  // Call Proxy.
  const result: any = await AppImpl.getProductDB().createUser({
    email,
    name,
    phone,
  });

  // Send success.
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        result,
      },
      null,
      2
    ),
  };
};

export const createStore: APIGatewayProxyHandler = async (event, _context) => {
  // Get data from request.
  let userPK,
    name,
    description,
    picture,
    street,
    street_number,
    zip,
    city,
    country;
  if (!event.queryStringParameters) {
    return {
      statusCode: 400,
      body: {
        error: "Mandatory QueryStringParameters are missing.",
      },
    };
  }

  if (event.queryStringParameters.name) {
    name = event.queryStringParameters.name;
  }
  if (event.queryStringParameters.userPK) {
    userPK = event.queryStringParameters.userPK;
  }
  if (event.queryStringParameters.description) {
    description = event.queryStringParameters.description;
  }
  if (event.queryStringParameters.picture) {
    picture = event.queryStringParameters.picture;
  }
  if (event.queryStringParameters.street) {
    street = event.queryStringParameters.street;
  }
  if (event.queryStringParameters.street_number) {
    street_number = event.queryStringParameters.street_number;
  }
  if (event.queryStringParameters.zip) {
    zip = event.queryStringParameters.zip;
  }
  if (event.queryStringParameters.city) {
    city = event.queryStringParameters.city;
  }
  if (event.queryStringParameters.country) {
    country = event.queryStringParameters.country;
  }

  if (!userPK || !name) {
    return {
      statusCode: 400,
      body: {
        error:
          "userPK or name could not be found in the request but both are mandatory.",
      },
    };
  }

  // Call Proxy.
  const result: any = await AppImpl.getProductDB().createStore({
    userPK,
    name,
    description,
    picture,
    street,
    street_number,
    zip,
    city,
    country,
  });

  // Send success.
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        result,
      },
      null,
      2
    ),
  };
};

export const createProduct: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  // Get data from request.
  let name, description, price, pictures, storePK;
  if (!event.queryStringParameters) {
    return {
      statusCode: 400,
      body: {
        error: "Mandatory QueryStringParameters are missing.",
      },
    };
  }

  if (event.queryStringParameters.name) {
    name = event.queryStringParameters.name;
  }
  if (event.queryStringParameters.storePK) {
    storePK = event.queryStringParameters.storePK;
  }
  if (event.queryStringParameters.description) {
    description = event.queryStringParameters.description;
  }
  if (event.queryStringParameters.pictures) {
    pictures = JSON.parse(event.queryStringParameters.pictures);
  }
  if (event.queryStringParameters.price) {
    price = event.queryStringParameters.price;
  }

  if (!storePK || !name || !price) {
    return {
      statusCode: 400,
      body: {
        error:
          "storePK, name or price could not be found in the request but all are mandatory.",
      },
    };
  }

  // Call Proxy.
  const result: any = await AppImpl.getProductDB().createProduct({
    name,
    description,
    price,
    pictures,
    storePK,
  });

  // Send success.
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        result,
      },
      null,
      2
    ),
  };
};
