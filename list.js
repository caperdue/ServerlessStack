import handler from "./libs/handler-lib.js";
import dynamoDb from "./libs/dynamodb-lib.js";

export const main = handler(async(event, context) => {
    const params = {
        TableName: "notes",
        //Key defines the partition key and sort key of the item to be retrieved
        // 'KeyConditionExpression' defines the condition for the query
        // - 'userId = :userId': only return items with matching 'userId'
        // partition key
        KeyConditionExpression: "userId = :userId",

        // 'ExpressionAttributeValues' defines the value in the condition
        // - ':userId': defines 'userId' to be the id of the author
        ExpressionAttributeValues: {
            ":userId": event.requestContext.identity.cognitoIdentityId,
        },
    };

    const result = await dynamoDb.query(params);
    // Return the matching list items in the response body
    return result.Items;
});