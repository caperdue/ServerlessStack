//Handler function to handle all HTTP responses in one place
export default function handler(lambda) {
    return async function (event, context) {
        let body, statusCode;

        try {
            //Run async lambda function
            body = await lambda(event, context);
            statusCode = 200;
        }
        catch (e) {
            body = {error: e.message};
            statusCode = 500;
            console.log(e);
        }
        return {
            statusCode,
            body: JSON.stringify(body),
        };
    };
}