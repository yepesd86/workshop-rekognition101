
# Workshop Rekognition 101

Workshop a dictarse en la 10ma edición de Nerdearla



## Warm Up

* Create S3 Bucket and write down the name of the bucket / Crear un Bucket de S3 y anotar el nombre
* Create a folder in the bucket called warmup and upload the following image: [Click here](https://github.com/ricardoceci/workshop-rekognition101/blob/master/warmup/fondo_nerdearla.png) / Crear una carpeta en el bucket llamada Warm Up y subir la siguiente imágen: [Click aqui](https://github.com/ricardoceci/workshop-rekognition101/blob/master/warmup/fondo_nerdearla.png)
* Create a Cloud9 Instance running AmazonLinux2 t2.micro / Crear una instancia de Cloud9 con Amazonlinux2 t2.micro
* Run the following commands / Ejecutar los siguientes comandos:

### Deteccion de etiquetas


```bash
  aws rekognition detect-labels --image '{"S3Object":{"Bucket":"[NombreDelBucket]","Name":"warmup/fondo_nerdearla.png"}}' --min-confidence [Minimo de Seguridad]  
```

## FaceDetection

Clonar el proyecto

```bash
  git clone https://github.com/ricardoceci/workshop-rekognition101
```

Go to the project directory

```bash
  cd workshop-rekognition101
```

Install dependencies

```bash
  npm install
```

Upload to foto_aceptada a photo of your face.

```bash
  foto_aceptada/
```

Edit app.js Line 7 and put your file name.

```javascript
  const myPhoto = '[YOUR_PHOTO_FILE]';
```

Start the server

```bash
  node app.js
```


## Serverless Photo Organizer

* Create S3 Bucket with the following folders: *photos-input/* and *photos-output/* write down the Bucket Name / Crear un Bucket de S3 con las siguientes carpetas: *photos-input/* y *photos-output/*
* Create a NodeJS Lambda Function / Crear una función Lambda Node.js
* Add an S3 triggerer to the lambda function (Bucket: created in 1, prefix: shared_photos/ and ACK) **Please NOTE the prefix, if you don't add this prefix then you'll probably incur in additional costs**
* Agregar un triggerer de S3 a la función lambda (Bucket: el creado en el paso 1, prefix: shared_photos y aceptar los terminos) **No olvidar agregar el prefix, si no se agrega pueden incurrir en costos adicionales**
* Agregar los siguientes permisos al rol que ejecuta la función Lambda: AWSRekognitionReadOnlyAccess y

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:GetObjectAttributes"
            ],
            "Resource": "arn:aws:s3:::[NOBMREDELBUCKET]/*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl"
            ],
            "Resource": "arn:aws:s3:::[NOBMREDELBUCKET]/photos-output/*"
        }
    ]
}
```


    
## Feedback

If you have any feedback, please reach out to me at @ricardoceci

