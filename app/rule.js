const common = require("./common.js");
const rules = {
    "0": "ガチエリア",
    "1": "ガチヤグラ",
    "2": "ガチホコ",
    "3": "ガチアサリ"
  };

  module.exports = async function handleRule(msg) {
    console.log(rules);
    const prefix = await common.getPrefix(msg);
    if (msg.content.startsWith(`${prefix}rule stage`)) {
        var stage = common.stage2txt(Math.floor(Math.random() * 23).toString());
        msg.channel.send("`" + stage + "`でし！");
    } else if (msg.content.startsWith(`${prefix}rule`)) {
        var rule = rules[Math.floor(Math.random() * 4)];
        msg.channel.send("`" + rule + "`でし！");
    }
}