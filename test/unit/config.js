const {objectSFTPReq,objectSFTPOpt} = require('sftp-cg-lib');
let properties = {...objectSFTPReq};
let opt = {...objectSFTPOpt};
properties.host = "nephum.com";
properties.port = 22;
properties.username = "ubuntu";
opt.key = './Keypair6Delta.ppk';
opt.path = '/home/ubuntu/OIH/componentes/temp/input/';
properties = {...properties, ...opt};

//other server
let properties2 = {...objectSFTPReq};
let opt2 = {...objectSFTPOpt};
properties2.host = "34.207.130.95";
properties2.port = 22;
properties2.username = "mysftpUser";
opt2.password = "Cloudgen@123";
opt2.path = '/mysftpUser/testserver/incoming/Test/';
delete opt2.key;
properties2 = {...properties2, ...opt2};

const results = ['rowsAffected', Array, 'rows'];
module.exports = {
    properties,
    properties2,
    results
};
