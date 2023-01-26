const {producerErrorMessage} = require('errorhandler-nxg-cg');
const {constants} = require('utils-nxg-cg');
const {sftp} = require('sftp-cg-lib');
const {emits} = constants;
const {loging_elastic} = require('loging-elastic-cg-lib');
const {createSum, checkSumMD5} = require("md5-node-cg-lib");
const {log_levels} = constants;

/**
 * Method for sftp connections
 * @param msg
 * @param cfg
 * @param snapshot
 * @returns {Promise<void>}
 */
module.exports.process = async function sftpProcess(msg, cfg, snapshot = {}) {
    try {
        loging_elastic(constants.START_EXEC, log_levels.debug);
        const default_level = log_levels.info;
        let {data} = msg;
        let payload = constants.PAYLOAD_NOT_ALLOWED;
        let {uniquetransactionid, allowPayload} = cfg;
        if (allowPayload)
            payload = data;
        if (!uniquetransactionid)
            loging_elastic(payload, default_level);
        else
            loging_elastic(payload, default_level, uniquetransactionid);
        const md5_source = checkSumMD5(msg, cfg);
        if (md5_source) {
            const {result, flag} = await sftp(msg, cfg);
            const data = {
                content: result
            }
            const md5sum = createSum(result, flag);
            if (md5sum)
                data.md5sum = md5sum;
            this.emit(emits.data, {data});
            snapshot.lastUpdated = new Date();
            this.emit(emits.snapshot, snapshot);
            loging_elastic(constants.FINISH_EXEC, log_levels.debug);
            this.emit(emits.end);
        }else
            throw Error(constants.ERROR_MD5);
    } catch (e) {
        this.emit('error', e);
        loging_elastic(e, log_levels.error);
        producerErrorMessage(msg, e);
    }
};