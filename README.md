[![N|Solid](https://cloudgensys.com/cg-demo/wp-content/uploads/2019/05/CG-Logo-01.png)](https://www.cloudgensys.com/)

# sftp-component

This component is based on Open Integration Hub framework, allowing this to connect with other components in order to have different flow exchanging data in a specific goal of transformation for the information.

This component allows to open a connection with a SFTP server.

## Features

- Create a directory in an specific path.
- Delete the directory and their content.
- Delete a file in an specific path.
- Download the directory inside a SFTP in a local machine.
- Get the content of a file, an specific enconding can be requested.
- Get the list of files and directories inside a specific path.
- Rename a file inside a path.
- Create a file inside the SFTP server, the content of the file is a string that can have an specific encondig, the enconding must be specified.
- Take a directory for a local machine and save the content inside a SFTP server.

## Libraries

- [errorhandler-nxg-cg](https://www.npmjs.com/package/errorhandler-nxg-cg)
- [utils-nxg-cg](https://www.npmjs.com/package/utils-nxg-cg)
- [loging-elastic-cg-lib](https://www.npmjs.com/package/loging-elastic-cg-lib)
- [sftp-cg-lib](https://www.npmjs.com/package/sftp-cg-lib)

> For more detail of the functionality review **[sftp-cg-lib](https://github.com/CloudGenUser/sftp-cg-lib)** documentation

## Installation

Docker image: cloudgenuser/sftp-component:1.0.0

Functions
- trigger:
  - sftp_source
- action:
  - sftp

Fields:
- content: The string that containt the information inside the file that will be get from the SFTP or the file that will be created. It can be a base64, utf8 or other enconding.
- encoding: It refers to the type of enconging that will be used to get from the file or be written to the new file, if this parameter is not sent the base64 value will be taken as default.
- file: The name of the file that will be processed inside the SFTP server (according with the availables options for the flag parameter).
- flag: The string that indicates the actinon to be executed by the component, it can be one of the next: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, DOWNLOADIRECTORY, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE, UPLOADIRECTORY. The string is not case sensitive.
- host: The host where the connection will be stablished to the SFTP server, can be a URL or IP.
- key: Parameter that have the path where is the key to be use as authentication when it is configured for the SFTP server to stablish the connection, if this parameter is used the password parameter shouldn't be set, in case the two parameters are specified this one will have priority and the password will be ignored.
- nameDirectory: The name of the directory that will be processed according with the flag parameter (it will depend on the option selected for the flag parameter).
- nameNewFile: The new name of the file that will be used, this parameter is used when a rename of a file is requested.
- password: This parameter contains the password to stablish the connection with the SFTP server.
- path: The full path where the action will be performed as follows: create the directory in the SFTP, delete a directory in the SFTP, the directory that will be downloaded from the SFTP or the location in which the files will be uploaded inside the SFTP.
- port: The port that is configuted in the SFTP server to allow access.
- username: The username that have grants to connect with the SFTP server.
