const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const FriendCodeService = require('../../../db/friend_code_service.js');
const { searchMemberById } = require('../../manager/memberManager.js');
const log4js = require('log4js');

log4js.configure(process.env.LOG4JS_CONFIG_PATH);
const logger = log4js.getLogger();

module.exports = {
    handleFriendCode: _handleFriendCode,
    deleteFriendCode: _deleteFriendCode,
};

async function _handleFriendCode(interaction) {
    if (!interaction.isCommand()) return;
    // 'インタラクションに失敗'が出ないようにするため
    await interaction.deferReply({ ephemeral: false });
    // friend_codeテーブルがなければ作る
    await FriendCodeService.createTableIfNotExists();

    const options = interaction.options;
    const subCommand = options.getSubcommand();
    if (subCommand === 'add') {
        insertFriendCode(interaction);
    } else if (subCommand === 'show') {
        selectFriendCode(interaction);
    }
}

async function selectFriendCode(interaction) {
    const guild = await interaction.guild.fetch();
    let targetUser = await searchMemberById(guild, interaction.member.user.id);
    let id = interaction.member.user.id;

    let fc = await FriendCodeService.getFriendCodeByUserId(id);
    if (fc[0] != null) {
        await interaction.editReply({
            embeds: [composeEmbed(targetUser, fc[0].code)],
            ephemeral: false,
        });
        return;
    } else {
        await interaction.editReply({
            content: '未登録みたいでし！`/friend_code add`でコードを登録してみるでし！',
            ephemeral: true,
        });
    }
}

function composeEmbed(users, fc) {
    const embed = new EmbedBuilder();
    embed.setDescription(fc);
    embed.setAuthor({
        name: users.displayName,
        iconURL: users.displayAvatarURL(),
    });
    return embed;
}

async function insertFriendCode(interaction) {
    let id = interaction.member.user.id;
    const options = interaction.options;
    const code = options.getString('フレンドコード');

    await FriendCodeService.save(id, code);
    await interaction.editReply({
        content: `\`${code}\`で覚えたでし！変更したい場合はもう一度登録すると上書きされるでし！`,
        ephemeral: true,
    });
}

async function _deleteFriendCode(interaction) {
    await interaction.message.delete();
}
