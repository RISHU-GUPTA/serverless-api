import * as uuid from "uuid";
import AWS from "aws-sdk";
AWS.config.update({
    region: "us-east-2" });
const dynamoDb = new AWS.DynamoDB.DocumentClient();
export function main(event, context, callback) {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);
    console.log("data is",data);
    const params = {
    TableName: process.env.tableName,
    Item: {
        userId: event.requestContext.identity.cognitoIdentityId,
        noteId: uuid.v1(),
        content: data.content,
        createdAt: Date.now()
        }
        };
        dynamoDb.put(params, (error, data) => {
            console.log("data after db is",data);
        // Set response headers to enable CORS (CrossOrigin Resource Sharing)
        const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
        };
        if (error) {
            const response = {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ status: false,error:error })
            };
            callback(null, response);
            return;
            }


 const response = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(params.Item)
    };
    callback(null, response);
    });
   }