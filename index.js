var fs = require('fs');
var path = require('path');

var watcher = {
    _fileList: [],
    _pathList: [],
    _execFolder : '',
    count: 0,
    _getFileList: function(files, context) {

        files.child.forEach(function(item) {

            var folderPath = files.parent + '/' + item;

            var fileStats = fs.statSync(folderPath); 

            if (fileStats.isDirectory()) {

                console.log(' - - - - 18 - > next level', folderPath);

                context._readDir(folderPath, context._getFileList, context);

                context._watchFolders(folderPath);
            }
        });
        console.log(context.count);
        context.count++;
    },
    _onCreationFile: function(filename, context) {

    },
    _watchFolders: function(folder){
        return fs.watch(folder);
    },
    _readDir: function(folderName, callback, context) {

        fs.readdir(folderName, function(err, files) {
            if (err) {
                console.log(err);
                return context.error(err);
            }

            var tree = { 
                parent : folderName,
                child : files
            };

            callback(tree, context);
        });
    },
    init: function(folder) {

        var watchedFile, previousEvent, previousFilename, 
            self = this;

        this._execFolder = folder;

        this._readDir(this._execFolder, this._getFileList, self);

        return;
        watchedFile = self._watchFolders(folder);

        watchedFile.on('error', self.error).on('change', function(evt, filename) {

            if (!filename) {
                return;
            }

            if ((previousEvent === 'rename' && evt === 'change') && (previousFilename === filename)) {

                self._onCreationFile(filename, self);

                previousEvent = 'creation';

            } else {

                previousEvent = evt;
            }

            previousFilename = filename;
        });
    },
    error: function(err) {

        console.log(' - - - ERROR - - -\n', err);
    }
}

watcher.init('imgFolder');

console.log('Watcher');