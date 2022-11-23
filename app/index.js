// Discord bot implements
// Discord bot implements
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { URLSearchParams } = require('url');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ],
});
const DISCORD_VOICE = require('./tts/discordjs_voice.js');
const Discord = require('discord.js');
const Handler = require('./handler.js');
const Dispandar = require('./event/dispandar.js');
const registerSlashCommands = require('../register.js');
const deleteToken = require('./event/delete_token.js');
const { handleFriendCode, deleteFriendCode } = require('./cmd/other/friendcode.js');
const handleBuki = require('./cmd/splat3/buki.js');
const handleKansen = require('./cmd/other/kansen.js');
const handleHelp = require('./cmd/other/help.js');
const handlePick = require('./cmd/other/pick.js');
const handleShow = require('./cmd/splat3/show.js');
const handleTimer = require('./cmd/other/timer.js');
const handleVoicePick = require('./cmd/other/vpick.js');
const handleWiki = require('./cmd/other/wiki.js');
const { commandNames } = require('../constant');
const VOICE_API = require('./tts/voice_bot_node.js');
client.login(process.env.DISCORD_BOT_TOKEN);

client.on('messageCreate', async (msg) => {
    await deleteToken(msg);
    Handler.call(msg);
    Dispandar.dispand(msg);
    DISCORD_VOICE.play(msg);
});

client.on('guildMemberAdd', async (member) => {
    const guild = await member.guild.fetch();
    if (guild.id === process.env.SERVER_ID) {
        client.user.setActivity(`${guild.memberCount}人`, {
            type: ActivityType.Playing,
        });
    }
});

client.on('guildMemberRemove', async (member) => {
    try {
        const guild = await member.guild.fetch();
        if (guild.id === process.env.SERVER_ID) {
            client.user.setActivity(`${guild.memberCount}人`, {
                type: ActivityType.Playing,
            });
        }
    } catch (err) {
        console.log('guildMemberRemove');
        console.log({ err });
    }
});

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    await registerSlashCommands();
    const guild = client.user.client.guilds.cache.get(process.env.SERVER_ID);
    client.user.setActivity(`${guild.memberCount}人`, { type: ActivityType.Playing });
});

/**
 *
 * @param {Discord.Interaction} interaction
 */
async function onInteraction(interaction) {
    try {
        if (interaction.isCommand()) {
            const { commandName } = interaction;

            if (commandName === commandNames.friend_code) {
                await handleFriendCode(interaction);
            } else if (commandName === commandNames.buki) {
                handleBuki(interaction);
            } else if (commandName === commandNames.show) {
                handleShow(interaction);
            } else if (commandName === commandNames.pick) {
                handlePick(interaction);
            } else if (commandName === commandNames.voice_pick) {
                handleVoicePick(interaction);
            } else if (commandName === commandNames.kansen) {
                handleKansen(interaction);
            } else if (commandName === commandNames.wiki) {
                handleWiki(interaction);
            } else if (commandName === commandNames.timer) {
                handleTimer(interaction);
            } else if (commandName === commandNames.help) {
                handleHelp(interaction);
            } else if (commandName === commandNames.voice) {
                // 'インタラクションに失敗'が出ないようにするため
                await interaction.deferReply();
                DISCORD_VOICE.handleVoiceCommand(interaction);
                VOICE_API.setting(interaction);
            }
            return;
        }
    } catch (error) {
        const error_detail = {
            content: `Command failed: ${error}`,
            interaction_replied: interaction.replied,
            interaction_deferred: interaction.deferred,
        };
        console.log(error_detail);
    }
}

client.on('interactionCreate', (interaction) => onInteraction(interaction).catch((err) => console.error(err)));
