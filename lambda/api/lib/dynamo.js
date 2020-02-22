const AWS = require('aws-sdk'); 
const moment = require('moment'); 
const shortid = require('shortid'); 
 
AWS.config.logger = console;


/** 
 * @function listTests 
 * Description: returns a consolidated list of test scenarios 
 */ 
const listTests = async () => { 
 
    const dynamoDB = new AWS.DynamoDB.DocumentClient({ 
        region: process.env.AWS_REGION 
    }); 
 
    let data; 
 
    try { 
 
        console.log('List tests'); 
 
        const params = { 
            TableName: process.env.SCENARIOS_TABLE, 
            AttributesToGet: [ 
                'testId', 
                'testName', 
                'testDescription', 
                'status', 
                'startTime' 
            ], 
        }; 
        data = await dynamoDB.scan(params).promise(); 
    } catch (err) { 
        throw err; 
    } 
    return data; 
}; 