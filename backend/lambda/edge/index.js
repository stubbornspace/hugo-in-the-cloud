/**


*/
exports.handler = async (event) => {

    console.log(JSON.stringify(event, null, 2));
    // get request url
    let request = event.Records[0].cf.request;
    let olduri = request.uri;
    //add /index/html
    let newuri = olduri.replace(/\/$/, '\/index.html');
    console.log("Old URI: " + olduri);
    console.log("New URI: " + newuri);
    request.uri = newuri;
    return request;
};
