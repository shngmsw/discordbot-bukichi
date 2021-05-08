const handleBuki = require("./buki.js");
const handleFriendCode = require("./friendcode.js");
const handleSpecial = require("./special.js");
const handleHelp = require("./help.js");
const handleKansen = require("./kansen.js");
const handlePick = require("./pick.js");
const handleRule = require("./rule.js");
const handleShow = require("./show.js");
const handleStageInfo = require("./stageinfo.js");
const handleSub = require("./sub.js");
const handleTimer = require("./timer.js");
const handleVoicePick = require("./vpick.js");
const handleWiki = require("./wiki.js");
const conf = require('config-reloadable');

module.exports = {
  call: call
};

function call(msg) {
  var strCmd = msg.content.replace(/　/g, " ");
  const args = strCmd.split(" ");
  const command = args.shift().toLowerCase();
  const prefix = await common.getPrefix(msg.guild.id);

  switch (command) {
    case `${prefix}wiki`:
      handleWiki(msg, args[0]);
      break;
    case `${prefix}kansen`:
      handleKansen(msg, args[0]);
      break;
    case `${prefix}timer`:
      handleTimer(msg, args[0]);
      break;
    case `${prefix}pick`:
      handlePick(msg);
      break;
    case `${prefix}vpick`:
      handleVoicePick(msg);
      break;
    case `${prefix}rule`:
      handleRule(msg);
      break;
    case `${prefix}sub`:
      handleSub(msg);
      break;
    case `${prefix}special`:
      handleSpecial(msg);
      break;
    case `${prefix}buki`:
    case `${prefix}weapon`:
      handleBuki(command, msg);
      break;
    case `${prefix}show`:
      handleShow(msg, args[0]);
      break;
    case `${prefix}help`:
      handleHelp(msg);
      break;
    case `${prefix}fc`:
    case `${prefix}fcadd`:
      handleFriendCode(msg);
      break;
    case `${prefix}stageall`:
      handleStageInfo(msg);
      break;
    case `${prefix}prefix`:
      handlePrefix(msg);
      break;
  }
}