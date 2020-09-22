import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";


    export const main = handler(async (event, context) => {
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
        await dynamoDb.put(params);
        return params.Item;
   });