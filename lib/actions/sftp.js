const rabbitmq = require('rabbitmqcg-nxg-oih');
const {log, constants} = require('utils-nxg-cg');
const {sftp} = require('sftp-cg-lib');
const {emits} = constants;

/**
 * Method for convent edi file to json with format JSEdiNotation
 * @param msg
 * @param cfg
 * @param snapshot
 * @returns {Promise<void>}
 */
module.exports.process = async function sftp(msg, cfg, snapshot = {}) {
    try {
        const _data = await sftp(msg, cfg);
        this.emit(emits.data, {data: _data});
        snapshot.lastUpdated = new Date();
        this.emit(emits.snapshot, snapshot);
        log.info(constants.FINISH_EXEC);
        this.emit(emits.end);
    } catch (e) {
        log.error(e);
        this.emit(emits.error, e);
        await rabbitmq.producerErrorMessage(msg.toString(), e.toString());
    }
};