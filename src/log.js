/**
 * Created by Weil on 2017/5/31.
 */

let createLog = function (logFunc, logLevel) {
    let LOG = {};
    LOG.ALL = (...args) => {
        logFunc('FILE_ALL', ...args);
    };
    LOG.DEBUG = (...args) => {
        logFunc('FILE_DEBUG', ...args);
    };
    LOG.INFO = (...args) => {
        logFunc('FILE_INFO', ...args);
    };
    LOG.WARN = (...args) => {
        logFunc('FILE_WARN', ...args);
    };
    LOG.ERROR = (...args) => {
        logFunc('FILE_ERROR', ...args);
    };
    LOG.FATAL = (...args) => {
        logFunc('FILE_FATAL', ...args);
    };
    LOG.OFF = (...args) => {
        logFunc('FILE_OFF', ...args);
    };

    return LOG;
};

export default createLog;
