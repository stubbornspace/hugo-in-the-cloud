//
const AWS = require('aws-sdk');
const util = require('util');
const fsPath = require('fs-path');
const mime = require('mime-types');
const fs = require('fs');
//
const s3 = new AWS.S3();
const writeFile = util.promisify(fsPath.writeFile);
const exec = util.promisify(require('child_process').exec);
const findFile = util.promisify(fsPath.find);
const readFile = util.promisify(fs.readFile);

/**
Step 1. get a list of files from S3 and download to local filesystem
*/
const GetFiles = async (bucket,srcPath) => {
  try {
    console.log(`DOWNLOAD FILES:: ${bucket}${srcPath}`);
    let params = {
      Bucket: bucket,
      Prefix: srcPath
    };
    let data = await s3.listObjects(params).promise();
    await Promise.all(data.Contents.map(async (obj) => {
      if (!obj.Key.endsWith('/')) {
          let params = {
          Bucket: bucket,
          Key: obj.Key,
        };
        let file = await s3.getObject(params).promise();
        await writeFile(`/tmp/${obj.Key}`, file.Body.toString());
      }
    }));
  } catch (err) {
    console.log(err);
    throw err;
  }
  console.log('DOWNLOAD COMPLETE');
  return;
};

/**
Step 2. Run Hugo on local files to generate site.
*/
const RunHugo = async (srcPath,destPath) => {
  try {
    console.log(`RUNNING HUGO:: /tmp/${srcPath} == /tmp/${destPath}`);
    const {stdout,stderr} = await exec(`./bin/hugo --source=/tmp/${srcPath} --destination=/tmp/${destPath}`);
    if (stderr) {
      throw new Error(`Error:: ${stderr}`);
    } else {
      console.log(stdout);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
  console.log('HUGO COMPLETE');
  return;
};

/**
Step 3. get a list of the local files and upload to s3.
*/
const UploadFiles = async (bucket,destPath) => {
  try {
    console.log(`UPLOADING FILES:: ${bucket}${destPath}`);
    let siteFiles = await findFile(`/tmp/${destPath}`);

    //siteFile.files is a list []
    await Promise.all(siteFiles.files.map(async (file) => {
      let body = await readFile(file, 'utf8');
      let uploadFile = file.split('/').slice(2).join("/");
      let type = mime.lookup(file);
      let params = {
        Bucket: bucket,
        Key: uploadFile,
        Body: body,
        ContentType: type.toString(),
        ACL: 'public-read'
      };
      await s3.putObject(params).promise();
    }));

  } catch (err) {
    console.log(err);
    throw err;
  }
  console.log('UPLOAD COMPLETE');
  return;
};

/**
Step 4. delete localfiles
*/
const Delete = async (srcPath,destPath) => {
  try {
    console.log(`DELETEING LOCAL FILES:: /tmp/${srcPath} & /tmp/${destPath}`);
    const {stdout,stderr} = await exec(`rm -rf /tmp/${srcPath} /tmp/${destPath}`);
    if (stderr) {
      throw new Error(`Error:: ${stderr}`);
    } else {
      console.log(stdout);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
  console.log('DELETE COMPLETE');
  return;
};


module.exports = {
  getFiles: GetFiles,
  runHugo: RunHugo,
  uploadFiles: UploadFiles,
  delete:Delete,
  test:Test
};
