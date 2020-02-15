const hugo = require('./lib/hugo.js');

const bucket = 's3bucket';
const srcPath = 'hugo/';
const destPath = 'www/'

exports.handler = async (event) => {
    let response = {
        statusCode: '200',
        body: 'Build Complete:: URL',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
    try {
        await hugo.getFiles(bucket, srcPath);
        await hugo.runHugo(srcPath, destPath);
        await hugo.uploadFiles(bucket, destPath);
        await hugo.delete(srcPath, destPath);
    } catch (err) {
        console.log(err);
        response.statusCode = '400';
        response.body = err;
    }
    console.log('ALL DONE!')
    return response;
};
