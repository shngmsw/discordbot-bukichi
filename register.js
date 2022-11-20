const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { ChannelType } = require('discord-api-types/v10');
const { commandNames } = require('./constant.js');

require('dotenv').config();
const friendCode = new SlashCommandBuilder()
    .setName(commandNames.friend_code)
    .setDescription('フレンドコードの登録・表示')
    .addSubcommand((subcommand) =>
        subcommand
            .setName('add')
            .setDescription('フレンドコードを登録します。')
            .addStringOption((option) => option.setName('フレンドコード').setDescription('例：SW-0000-0000-0000').setRequired(true)),
    )
    .addSubcommand((subcommand) =>
        subcommand.setName('show').setDescription('登録したフレンドコードを表示します。未登録の場合は自己紹介から引用します。'),
    );

const wiki = new SlashCommandBuilder()
    .setName(commandNames.wiki)
    .setDescription('wikipediaで調べる')
    .addStringOption((option) => option.setName('キーワード').setDescription('調べたいキーワードを入力').setRequired(true));

const kansen = new SlashCommandBuilder()
    .setName(commandNames.kansen)
    .setDescription('プラベの観戦する人をランダムな組み合わせで抽出します。')
    .addIntegerOption((option) =>
        option.setName('回数').setDescription('何回分の組み合わせを抽出するかを指定します。5回がおすすめ').setRequired(true),
    );

const minutesTimer = new SlashCommandBuilder()
    .setName(commandNames.timer)
    .setDescription('分タイマー')
    .addIntegerOption((option) => option.setName('分').setDescription('〇〇分後まで1分ごとにカウントダウンします。').setRequired(true));

const pick = new SlashCommandBuilder()
    .setName(commandNames.pick)
    .setDescription('選択肢の中からランダムに抽出します。')
    .addStringOption((option) => option.setName('選択肢').setDescription('半角スペースで区切って入力してください。').setRequired(true))
    .addIntegerOption((option) =>
        option.setName('ピックする数').setDescription('2つ以上ピックしたい場合は指定してください。').setRequired(false),
    );

const vpick = new SlashCommandBuilder()
    .setName(commandNames.voice_pick)
    .setDescription('VCに接続しているメンバーからランダムに抽出します。')
    .addIntegerOption((option) =>
        option.setName('ピックする人数').setDescription('2人以上ピックしたい場合は指定してください。').setRequired(false),
    );

const buki = new SlashCommandBuilder()
    .setName(commandNames.buki)
    .setDescription('ブキをランダムに抽出します。')
    .addIntegerOption((option) => option.setName('ブキの数').setDescription('指定するとn個のブキをランダムに選びます。').setRequired(false))
    .addStringOption((option) =>
        option
            .setName('ブキ種')
            .setDescription('ブキ種を指定したい場合は指定できます。')
            .setChoices(
                { name: 'シューター', value: 'shooter' },
                { name: 'ブラスター', value: 'blaster' },
                { name: 'シェルター', value: 'brella' },
                { name: 'フデ', value: 'brush' },
                { name: 'チャージャー', value: 'charger' },
                { name: 'マニューバー', value: 'maneuver' },
                { name: 'リールガン', value: 'reelgun' },
                { name: 'ローラー', value: 'roller' },
                { name: 'スロッシャー', value: 'slosher' },
                { name: 'スピナー', value: 'splatling' },
                { name: 'ワイパー', value: 'wiper' },
                { name: 'ストリンガー', value: 'stringer' },
            )
            .setRequired(false),
    );

const show = new SlashCommandBuilder()
    .setName(commandNames.show)
    .setDescription('ステージ情報を表示')
    .addSubcommand((subcommand) => subcommand.setName('now').setDescription('現在のバンカラマッチのステージ情報を表示'))
    .addSubcommand((subcommand) => subcommand.setName('next').setDescription('次のバンカラマッチのステージ情報を表示'))
    .addSubcommand((subcommand) => subcommand.setName('nawabari').setDescription('現在のナワバリステージ情報を表示'))
    .addSubcommand((subcommand) => subcommand.setName('run').setDescription('現在のシフトを表示'));

const help = new SlashCommandBuilder()
    .setName(commandNames.help)
    .setDescription('ヘルプを表示します。')
    .addSubcommand((subcommand) => subcommand.setName('recruit').setDescription('募集コマンドの使い方を表示'))
    .addSubcommand((subcommand) => subcommand.setName('voice').setDescription('読み上げ機能のヘルプを表示'))



const voice = new SlashCommandBuilder()
    .setName(commandNames.voice)
    .setDescription('テキストチャットの読み上げコマンド')
    .addSubcommand((subcommand) => subcommand.setName('join').setDescription('読み上げを開始'))
    .addSubcommand((subcommand) =>
        subcommand
            .setName('type')
            .setDescription('読み上げボイスの種類を変更します。')
            .addStringOption((option) =>
                option
                    .setName('音声の種類')
                    .setDescription('声の種類を選択してください。')
                    .setChoices(
                        { name: 'ひかり（女性）', value: 'hikari' },
                        { name: 'はるか（女性）', value: 'haruka' },
                        { name: 'たける（男性）', value: 'takeru' },
                        { name: 'サンタ', value: 'santa' },
                        { name: '凶暴なクマ', value: 'bear' },
                        { name: 'ショウ（男性）', value: 'show' },
                    )
                    .setRequired(true),
            ),
    )
    .addSubcommand((subcommand) => subcommand.setName('kill').setDescription('読み上げを終了'));


const commands = [
    friendCode,
    wiki,
    kansen,
    minutesTimer,
    pick,
    vpick,
    buki,
    show,
    help,
    voice,
];

//登録用関数
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
module.exports = async function registerSlashCommands() {
    if (mode === 'global') {
        await rest
            .put(Routes.applicationCommands(process.env.DISCORD_BOT_ID), { body: commands })
            .then(() => console.log('Successfully registered application global commands.'))
            .catch(console.error);
    }
};
