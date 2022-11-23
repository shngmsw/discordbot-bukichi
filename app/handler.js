const { getPrefix } = require('./common.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    call: call,
};

async function call(msg) {
    var strCmd = msg.content.replace(/　/g, ' ');
    const args = strCmd.split(' ');
    const prefix = await getPrefix(msg);
    const command = args.shift().toLowerCase();

    switch (command) {
        case `${prefix}wiki`:
        case `${prefix}kansen`:
        case `${prefix}timer`:
        case `${prefix}pick`:
        case `${prefix}vpick`:
        case `${prefix}rule`:
        case `${prefix}sub`:
        case `${prefix}special`:
        case `${prefix}buki`:
        case `${prefix}weapon`:
        case `${prefix}show`:
        case `${prefix}help`:
        case `${prefix}fc`:
        case `${prefix}fcadd`:
        case `${prefix}stageall`:
        case `${prefix}prefix`:
        case `${prefix}join`:
        case `${prefix}kill`:
            msg.channel.send({
                embeds: [
                    new EmbedBuilder().setDescription(
                        '通常のコマンドは廃止され、スラッシュコマンドに移行しました。\n`/help`でコマンドを確認できるでし！',
                    ),
                ],
            });
            break;
    }
}
