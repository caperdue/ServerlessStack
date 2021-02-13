import handler from "./libs/handler-lib.js";
import dynamoDb from "./libs/dynamodb-lib.js";

export const main = handler(async (event, context) => {
  const params = {
    TableName: "notes",
    //Key defines the partition key and sort key of the item to be retrieved
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId, //The ID of the author
      noteId: event.pathParameters.id,
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Item;
});
