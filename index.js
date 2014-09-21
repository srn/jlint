'use strict';

var copypaste = require("copy-paste");

module.exports = function(callback){
  var lint = {
    parsed: void 0,
    content: void 0,
    exception: void 0
  };

  copypaste.paste(function (err, content) {
    try {
      lint.parsed = true;
      lint.content = JSON.stringify(JSON.parse(content), null, 2);
    } catch(ex) {
      lint.parsed = false;
      lint.content = content;
      lint.exception = ex;
    }

    callback(lint);
  });
}
