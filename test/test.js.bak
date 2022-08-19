const {log} = require('utils-nxg-cg');
const {sftp,objectSFTPOpt,objectSFTPReq} = require('sftp-cg-lib');
const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());
app.post('/', async(req, res)=>{
  let properties = {...objectSFTPReq};  
  //Basic parameters for stablish connection with sftp server.  
  properties.host=req.body.host;
  properties.port=req.body.port;
  properties.username=req.body.username;
  properties.password=req.body.password;
  properties.key=req.body.key;
  properties.flag=req.body.flag;
  properties.path=req.body.path;
  properties.file=req.body.file;
  properties.content=req.body.content;
  properties.nameNewFile=req.body.nameNewFile;
  properties.nameOldFile=req.body.nameOldFile;
  properties.nameDeleteFile=req.body.nameDeleteFile;
  properties.createDirectory=req.body.createDirectory;
  properties.deleteDirectory=req.body.deleteDirectory;
  properties.localDirectory=req.body.localDirectory;


  try{
    log.info("Se tiene llave..."+properties.key);
    if(fs.accessSync(properties.key, fs.R_OK)) {
      //content = fs.readFileSync(filename);
      log.info("Se tiene llave y si existe...");
     }
     else{
      log.info("Se tiene llave y no existe...");
     }
    const result = await sftp({data:properties},{});
    log.info("resultado", result);
    res.json(result);
  }

  catch(err){
    res.status(500).json(err);
  }
})

app.listen(3000, ()=>{
  console.log("Server ejecutandose en el puerto 3000");
});