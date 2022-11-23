const common = require('./common.js');
const insert = require('../db/prefixes_insert.js');

module.exports = async function handlePrefix(msg) {
    var strCmd = msg.content.replace(/　/g, ' ');
    strCmd = strCmd.replace('  ', ' ');
    const args = strCmd.split(' ');
    args.shift();
    const newPrefix = args[0];
    if (newPrefix === undefined) {
        msg.channel.send('prefixを入力してください');
        return;
    } else if (newPrefix.length > 4) {
        msg.channel.send('prefixは4文字までで入力してください');
        return;
    }
    console.log(newPrefix);
    await insert(msg.guild.id, newPrefix);
    msg.channel.send('prefixを`' + newPrefix + '`に変更しました。');
};
