const hugo = require('./lib/hugo.js');

exports.handler = async () => {
    const { bucket, srcPath, destPath } = process.env;

    try {
        await hugo.getFiles(bucket, srcPath);
        await hugo.runHugo(srcPath, destPath);
        await hugo.uploadFiles(bucket, destPath);
        await hugo.delete(srcPath, destPath);
    } catch (err) {
        console.log(err);
        throw err;
    }
    console.log('ALL DONE!')
    return 'sucess';
};
