const {sftp} = require('sftp-cg-lib');
const {properties, properties2} = require('./config');
const {convertToObject} = require("utils-nxg-cg/utils/helpers");

describe('Suite to test a sftp component', () => {
    jest.setTimeout(9000000);
    //const expect_api = JSON.parse(fs.readFileSync(path.join(__dirname, 'pokeapiResponse.json'), {encoding: 'utf8'}));
    //const expect_api_secure = (fs.readFileSync(path.join(__dirname, 'secureApi.txt'), {encoding: 'utf8'}));
    const base64 = 'dGVzdCBvZiBhIHNmdHAgY29tcG9uZW50';
    //change with your correct directory
    const downloadDirectory = '/home/asus/tmp/tmp/';

    //arreglar
    //estimulo
    //observar el resultado
    test('test sftp to CREATEDIRECTORY with right parameters', async () => {
        properties.flag = "CREATEDIRECTORY";
        properties.nameDirectory = "newDir/otherdir";
        const {result} = await sftp({}, properties, true);
        expect(result).toContain("created");
    });

    test('test sftp to CREATEDIRECTORY with wrong parameters', async () => {
        properties.username = "adminx";
        properties.password = "adminx";
        properties.flag = "CREATEDIRECTORY";
        properties.nameDirectory = "newDir/otherdir";

        await expect(sftp({}, properties, true)).rejects.toThrow();
    });

    test('test sftp to DELETEDIRECTORY with right parameters', async () => {
        properties.flag = "DELETEDIRECTORY";
        properties.nameDirectory = "newDir/otherdir";
        const {result} = await sftp({}, properties, true);
        expect(result).toContain("Successfully removed directory");
    });

    test('test sftp to DELETEDIRECTORY with wrong parameters', async () => {
        properties.username = "adminX";
        properties.password = "adminX";
        properties.flag = "DELETEDIRECTORY";
        properties.nameDirectory = "newDir/otherdir";
        await expect(sftp({}, properties, true)).rejects.toThrow();
    });

    test('test sftp to SAVEFILE with right parameters', async () => {
        properties.flag = "SAVEFILE";
        properties.path += "newDir";
        properties.content = base64;
        properties.file = "saveNewFile.txt";
        const {result} = await sftp({}, properties, true);
        expect(result).toContain("Uploaded data stream to");
    });

    test('test sftp to SAVEFILE with wrong parameters', async () => {
        properties.username = "adminX";
        properties.password = "adminX";
        properties.flag = "SAVEFILE";
        properties.path += "newDir";
        properties.content = base64;
        properties.file = "saveNewFile.txt";
        await expect(sftp({}, properties, true)).rejects.toThrow();
    });

    test('test sftp to GETFILE with right parameterssss', async () => {
        properties.flag = "GETFILE";
        properties.path += "newDir";
        properties.file = "saveNewFile.txt";
        const {result} = await sftp({}, properties, true);

        expect(result).toContain("dGVzdCBvZiBhIHNmdHAgY29tcG9uZW50");
    });

    test('test sftp to GETFILE with wrong parameters', async () => {
        properties.username = "adminx";
        properties.password = "adminx";
        properties.flag = "GETFILE";
        properties.path += "newDir";
        properties.file = "saveNewFile.txt";

        await expect(sftp({}, properties, true)).rejects.toThrow();
    });

    test('test sftp to RENAMEFILE with right parameters', async () => {
        properties.flag = "RENAMEFILE";
        properties.path += "newDir";
        properties.file = "saveNewFile.txt";
        properties.nameNewFile = "renameNewName.txt";

        const {result} = await sftp({}, properties, true);

        expect(result).toContain("Successfully renamed");
    });

    test('test sftp to RENAMEFILE with wrong parameters', async () => {
        properties.flag = "RENAMEFILE";
        properties.path += "newDir";
        properties.file = "saveNewFile.txt";
        properties.nameNewFile = "renameNewName.txt";
        await expect(sftp({}, properties, true)).rejects.toThrow();
    });

    test('test sftp to DOWNLOADIRECTORY with right parameters', async () => {
        properties.flag = "DOWNLOADIRECTORY";
        properties.path += 'newDir';
        properties.nameDirectory = downloadDirectory;

        const {result} = await sftp({}, properties, true);

        expect(result).toContain("downloaded to");
    });

    test('test sftp to DOWNLOADIRECTORY with wrong parameters', async () => {
        properties.flag = "DOWNLOADIRECTORY";
        properties.nameDirectory = "C://Users//Documents";
        properties.username = "adminx";
        properties.password = "adminx";
        await expect(sftp({}, properties, true)).rejects.toThrow();
    });

    test('test sftp to DELETEFILE with right parameters', async () => {
        properties.flag = "DELETEFILE";
        properties.file = "renameNewName.txt";
        properties.path += "newDir";

        const {result} = await sftp({}, properties, true);

        expect(result).toContain("Successfully deleted");
    });

    test('test sftp to DELETEFILE with wrong parameters', async () => {
        properties.username = "adminx";
        properties.password = "adminx";
        properties.flag = "DELETEFILE";
        properties.file = "newDir/renameNewName.txt"

        await expect(sftp({}, properties, true)).rejects.toThrow();
    });

    test('test sftp to GETLISTFILES with right parameters', async () => {
        properties.flag = "GETLISTFILES";
        const {result} = await sftp({}, properties, true);
        expect(JSON.stringify(result)).toContain("newDir");
    });

    test('test sftp to GETLISTFILES with wrong parameters', async () => {
        properties.username = "adminx";
        properties.password = "adminx";
        properties.flag = "GETLISTFILES";
        await expect(sftp({}, properties, true)).rejects.toThrow();
    });

    test('test sftp to UPLOADIRECTORY with right parameters', async () => {
        properties.flag = "UPLOADIRECTORY";
        properties.nameDirectory = downloadDirectory;
        properties.path += "newDir";
        const {result} = await sftp({}, properties, true);

        expect(result).toContain("uploaded to");
    });

    test('test sftp to UPLOADIRECTORY with wrong parameters', async () => {
        properties.username = "adminX";
        properties.password = "adminX";
        properties.flag = "UPLOADIRECTORY";
        properties.nameDirectory = "C://Users//DMV//Documents//myFolder";

        await expect(sftp({}, properties, true)).rejects.toThrow();
    });

    test('test sftp to GETLISTFILES with right parameters other sever', async () => {
        properties2.flag = "GETLISTFILES";
        const {result} = await sftp({}, properties2, true);
        await expect(JSON.stringify(result)).toContain("type");
    });
    
    test('test sftp to DOWNLOADIRECTORY with right parameters other server', async () => {

        properties2.flag = "DOWNLOADIRECTORY";
        properties2.nameDirectory = downloadDirectory;
        properties2.path += "newDir";
        const {result} = await sftp({}, properties2, true);
        await expect(result).toContain("downloaded to");
    });

    test('test sftp to GETFILE with No such file error other server', async () => {
        properties2.flag = "GETFILE";
        properties2.file = "file.file";
        await expect(sftp({}, properties2, true)).rejects.toThrow();
    });

    test('test sftp to DELETEDIRECTORY with wrong directory other server', async () => {
        properties2.flag = "DELETEDIRECTORY";
        properties2.nameDirectory += "newDir/otherdir";
        await expect(sftp({}, properties2, true)).rejects.toThrow();
    });

    test('test sftp to SAVEFILE with wrong grants other server', async () => {
        properties2.flag = "/mysftpUser/testserver/incoming/Test/SAVEFILE";
        properties2.content = base64;
        properties2.file = "saveNewFile.txt";

        await expect(sftp({}, properties2, true)).rejects.toThrow();
    });

    test('test sftp to RENAMEFILE an un existent file other server', async () => {

        properties2.flag = "RENAMEFILE";
        properties2.path += "newDir";
        properties2.file = "saveNewFile.txt";
        properties2.nameNewFile = "renameNewName.txt";

        await expect(sftp({}, properties2, true)).rejects.toThrow();
    });

    test('test sftp to DELETEFILE an un existent file other server', async () => {
        properties2.flag = "DELETEFILE";
        properties2.file = "/mysftpUser/testserver/incoming/Test/newDir/renameNewName.txt"

        await expect(sftp({}, properties2, true)).rejects.toThrow();
    });

    test('test sftp to UPLOADIRECTORY without grants other server', async () => {

        properties2.flag = "UPLOADIRECTORY";
        properties2.path = "/";
        properties2.nameDirectory = downloadDirectory;

        await expect(sftp({}, properties2, true)).rejects.toThrow();
    });

    test('test sftp to SAVEFILE with right parameters other server', async () => {
        properties2.flag = "SAVEFILE";
        properties2.content = base64;
        properties2.file = "saveNewFile.txt";

        const {result} = await sftp({}, properties2, true);
        await expect(result).toContain("Uploaded data stream to");
    });

    test('test sftp to GETFILE with right parameters different encoding', async () => {
        properties.flag = "GETFILE";
        properties.file = "Movies.json";
        properties.encoding = 'utf8'
        const {result} = await sftp({}, properties, true);
        await expect(convertToObject(result)).toHaveProperty("title");
    });
})