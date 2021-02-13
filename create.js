import handler from "./libs/handler-lib";
import * as uuid from "uuid";
import dynamoDb from "./libs/dynamodb-lib";

export const main =  handler(async (event, context) => {
    //Parse input from event body (HTTP request body)
    const data = JSON.parse(event.body);

    const params = {
        TableName: "notes",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            //Unique noteid
            noteId: uuid.v1(),
            //Contents of note as string
            content: data.content,
            attachment: data.attachment,
            //Time created
            createdAt: Date.now()
        }
    };

        //Call dynamoDb to put a new object with a generated noteId and current date
        await dynamoDb.put(params);
        return params.Item;
    });