const express = require("express");
const app = express();
const fileupload = require("express-fileupload");

const AWS  = require("aws-sdk");
const fs = require("fs");
const myPhoto = '[NOMBRE_DE_TU_FOTO]';

 const config = new AWS.Config({
     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   });
   
   

app.use(fileupload());
app.use(express.static('public'));
app.use(express.static('foto_aceptada'));

app.get("/",(request,response)=>{
    response.render('public/index.html')
});

app.post("/validateFace",async (request,response)=>{
    try{
   AWS.config.update({region:'us-east-1'});
   const rekognition = new AWS.Rekognition();
   let caraPermitida = fs.readFileSync(__dirname +'/foto_aceptada/'+myPhoto);
   const params = {
       "SourceImage":{
           "Bytes": request.files.image.data
       },
       "TargetImage":{
           "Bytes": caraPermitida
       },
       SimilarityThreshold: 70
   }
    const rekognitionResult = await rekognition.compareFaces(params).promise();
    let rightMatch = false;
    console.log(rekognitionResult);
    if(rekognitionResult && rekognitionResult.FaceMatches && rekognitionResult.FaceMatches.length){
        rekognitionResult.FaceMatches.forEach(data => {
         let position   = data.Face.BoundingBox
         let similarity = data.Similarity
         if(similarity > 99){
             rightMatch = true;
         }
       });
    }
       if(rightMatch){
             response.setHeader('Content-Type', 'application/json');
              response.status(200)
              response.end(JSON.stringify({ validated: true, palabraClave: "Nerdearla" }));
          
       }
       else {
           response.setHeader('Content-Type', 'application/json');
              response.status(200)
              response.end(JSON.stringify({ validated: false, palabraClave: "NO TE LA DIGO" }));
       }
    }
    catch(err){
      
         response.status(500);
            response.end(JSON.stringify({ validated: false, palabraClave: "Error: Probablemente no hay caras en la foto" }));

    }
   });

app.listen(8080,()=>{
    console.log("Listening on port 8080");
})