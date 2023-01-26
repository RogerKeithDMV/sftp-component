const {log} = require('utils-nxg-cg');
const {sftp, objectSFTPReq} = require('sftp-cg-lib');
const express = require('express');
const app = express();
app.use(express.json());
app.post('/', async (req, res) => {
    let properties = {...objectSFTPReq};
    //Basic parameters for establish connection with sftp server.
    properties.host = req.body.host;
    properties.port = req.body.port;
    properties.username = req.body.username;
    properties.password = req.body.password;
    properties.key = req.body.key;
    properties.flag = req.body.flag;
    properties.path = req.body.path;
    properties.file = req.body.file;
    properties.content = req.body.content;
    properties.nameNewFile = req.body.nameNewFile;
    properties.nameDirectory = req.body.nameDirectory;
    properties.encoding = req.body.encoding;

    try {
        log.info("va a ejeuctar sftp");
        //const result = await sftp({data: properties}, {});
        const {result, flag} = await sftp({data: properties}, {});
        //log.info("resultado", result);
        console.log("Si trae resultado...");
        const data = {
            content: result
        }
        console.log("md5...");
        //const md5sum = createSum(result, flag);
        //if (md5sum)
        //    data.md5sum = md5sum;
        console.log("Va a regresar resultado...");
        res.json(result);
    } catch (err) {
        res.status(400).json(err);
    }
})

app.listen(3000, () => {
    console.log("Server ejecutandose en el puerto 3000");
});