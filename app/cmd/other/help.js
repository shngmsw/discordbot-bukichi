const { EmbedBuilder } = require('discord.js');

module.exports = async function handleHelp(interaction) {
    if (!interaction.isCommand()) return;
    // 'インタラクションに失敗'が出ないようにするため
    await interaction.deferReply();
    await interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setAuthor({
                    name: 'Sheldonの使い方',
                    iconURL: 'https://cdn.glitch.com/4ea6ca87-8ea7-482c-ab74-7aee445ea445%2Fthumbnails%2Fbukichi.jpg',
                })
                .setColor(0x1bc2a5)
                .addFields([
                    {
                        name: '/voice join',
                        value: '```ボイスチャンネルにSheldonを参加```',
                        inline: true,
                    },
                    {
                        name: '/voice type',
                        value: '```音声タイプを変更します\n選択肢から指定可能```',
                        inline: true,
                    },
                    {
                        name: '/voice kill',
                        value: '```ボイスチャンネルからSheldonを切断```',
                        inline: true,
                    },
                    {
                        name: '/show ○○○',
                        value: '```ステージ情報を表示[now / next / nawabari / run]```',
                        inline: true,
                    },
                    {
                        name: '/buki',
                        value: '```ブキをランダムで選出\nブキの数とブキ種を指定可能```',
                        inline: true,
                    },
                    {
                        name: '/pick 選択肢を半スペ空けで記入',
                        value: '```選択肢の中からランダム選出\n選択する数を指定可能```',
                        inline: true,
                    },
                    {
                        name: '/vpick',
                        value: '```VCに接続している人をランダム抽出\n2人以上を抽出可能```',
                        inline: true,
                    },
                    {
                        name: '/kansen',
                        value: '```プラベの観戦者をランダムな組み合わせで抽出\n5試合分を指定するのがおすすめです。```',
                        inline: true,
                    },
                    {
                        name: '/friend_code show',
                        value: '```フレンドコードを表示```',
                        inline: true,
                    },
                    {
                        name: '/friend_code add SW-0000-0000-0000',
                        value: '```フレンドコードを登録\nもう一度登録すると上書きされます。他人のは登録できません。```',
                        inline: true,
                    },
                    {
                        name: '/wiki 〇〇',
                        value: '```wikipediaを検索して表示```',
                        inline: true,
                    },
                    {
                        name: '/timer',
                        value: '```n分後に通知```',
                        inline: true,
                    },
                ]),
        ],
    });
};
