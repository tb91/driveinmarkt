import {
  APIGatewayProxyResult,
  Context,
  APIGatewayProxyEvent,
} from "aws-lambda";
import "source-map-support/register";

export async function hello(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  console.log("RUNNING HANDLER!!!!");
  console.log(event);
  console.log("FINISHED RUNNING!!!");
  return {
    statusCode: 200,
    body: "IT WORKS",
  };
}
