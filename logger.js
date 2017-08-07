
var fs = require('fs');
var path = require('path');
var util = require('util');
var datetime = require('datetime');
var morgan = require('morgan');
var mkdirsSync = require('mkdir').mkdirsSync;

// *************************************************************************************************

var defaultInterval = 60*60*24*1000;
var defaultDateFormat = '%Y-%m-%d';

// *************************************************************************************************

module.exports = function(options) {
    mkdirsSync(path.dirname(options.path));

    var logStream = fs.createWriteStream(options.path, {flags: 'a'});
    var logger = morgan({stream: logStream, format: options.format});

    // XXXjoe Need to expose a way to cancel this timer
    var archiveInterval = setInterval(function() {
        archiveLogs(logStream, options.path, options.dateFormat);
    }, options.interval || defaultInterval);
    
    return logger;
}

function archiveLogs(logStream, logPath, dateFormat) {
    var logDate = datetime.format(new Date(), dateFormat || defaultDateFormat);
    var ext = path.extname(logPath);
    var name = path.basename(logPath, ext);
    var dir = path.dirname(logPath);
    var newPath = path.join(dir, name + '-' + logDate + ext);

    copyFile(logPath, newPath, function(err) {
        if (!err) {
            fs.truncateSync(logStream.fd, 0);
        } else {
            console.error("Unable to archive logs: " + err);
        }
    });
}

function copyFile(src, dst, cb) {
    fs.stat(dst, function(err) {
        if (!err) { cb(new Error(dst + " already exists.")); return; }

        fs.stat(src, function (err) {
            if (err) { cb(err); return }

            var is = fs.createReadStream(src);
            var os = fs.createWriteStream(dst);

            is.on("error", cb);
            os.on("error", cb);
            os.on("close", cb);
            is.pipe (os);            
      });
    });
}
