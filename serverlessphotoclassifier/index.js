const AWS  = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION })
var rekognition = new AWS.Rekognition();
var oldPrefix = 'fotos-input/';
var newPrefix = 'fotos-output/';
const sourceBucket = '[YOUR_BUCKET_NAME}';
const myPhoto = '[YOUR_PHOTO_FILE]';

async function checkSimilarity(rekognitionResult,imageName){
    let similarFaceDetected = false;
    for(const image of rekognitionResult.FaceMatches){
        if(image.Similarity > 90){
            similarFaceDetected = true;
        }
    }
    return similarFaceDetected;
}

async function copyImage(copyParams){
    var s3 = new AWS.S3();
    const result = await s3.copyObject(copyParams).promise();
    return result;
}
exports.handler = async (event) => {
    console.log("EVENT",JSON.stringify(event));
     
    // TODO implement
    let BucketName = event.Records[0].s3.bucket.name;
    let ImageName = event.Records[0].s3.object.key;
    
    try {
    const params = {
      SourceImage: {
        S3Object: {
          Bucket: BucketName,
          Name: ImageName
        }
      },
     TargetImage: {
         S3Object: {
             Bucket: sourceBucket,
             Name: myPhoto
             
         }
     },
      SimilarityThreshold: 70
    };
    console.log("COMPARING FACES",JSON.stringify(params));
     const rekognitionResult = await rekognition.compareFaces(params).promise();
     const similarFaceDetected = await checkSimilarity(rekognitionResult);
     
     if(similarFaceDetected){
           let copyParams = {
                     Bucket: BucketName,
                     CopySource: BucketName + '/' + ImageName,
                     Key: ImageName.replace(oldPrefix, newPrefix)
                }
         let result = await copyImage(copyParams);
     }
    }
    catch (err) {
        console.log("REKOGNITION ERROR",err);
    }
};
