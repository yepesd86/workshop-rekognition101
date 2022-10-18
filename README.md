
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

Start the server

```bash
  node app.js
```


## Feedback

If you have any feedback, please reach out to me at ricardoceci@gmail.com

