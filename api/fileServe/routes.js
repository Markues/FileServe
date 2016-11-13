let fs = require('fs');

module.exports = function(api) {
  // Listen for /api/fileServe/<filename>
  api.route('/api/fileServe/:fileName')
    .get((req, res) => {
      let fileLoc = './fileStore/' + req.params.fileName;
      let fullFileLoc = '../FileServe/api/fileServe/fileStore/' + req.params.fileName + '.json'

      // Check to see if that file exists
      fs.access(fullFileLoc, fs.F_OK, (err, stat) => {
        if (err === null) {
          // If there is no error
          let fileReq = require(fileLoc);
          res.json(fileReq);
        } else {
          // If we get an error
          console.log('No file found with the name: ', req.params.fileName);
          res.json([]);
        }
      });
    });
};
