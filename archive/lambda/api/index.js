

exports.handler = async (event) => {
    
    console.log(JSON.stringify(event, null, 2));

    const resource = event.resource;
    const method = event.httpMethod;
    const config = JSON.parse(event.body);
    const errMsg = `Method: ${method} not supported for this resource: ${resource} `;

    let data;
    let response = {
        headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        statusCode: 200,
    };
    
    try {
        
        switch (resource) {
            
            case '/list':
                switch (method) {
                    case 'GET':
                        data = 'list of posts from dynamoDB';
                         break;
                    default:
                        throw new Error(errMsg);
                }
                break;
            
            case '/posts':
                
                switch (method) {
                    case 'GET':
                        data = 'get post details';
                         break;
                    case 'PUT':
                        data = 'Create / Update post';
                         break;
                    case 'DEL':
                        data = 'delete post';
                         break;
                    default:
                        throw new Error(errMsg);
                }
                break;
            
            case '/publish':
                switch (method) {
                    case 'POST':
                        data = 'publish new version of the hugo site';
                         break;
                    default:
                        throw new Error(errMsg);
                }
                break;
            
            
            default:
                throw new Error(errMsg);
        }
        
        response.body = JSON.stringify(data);
        
    } catch (err) {
        console.log(err);
        response.body = err.toString();
        response.statusCode = 400;
    }
    return response;
};
