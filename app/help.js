const common = require("./common.js");

module.exports = async function handleHelp(msg) {
    var strCmd = msg.content.replace(/　/g, ' ');
    strCmd = strCmd.replace('  ', ' ');
    const args = strCmd.split(' ');
    const prefix = await common.getPrefix(msg);
    const helpValuePrefix = prefix + "prefix [newPrefix]";
    args.shift();
    if (args[0] == 'voice') {
        msg.channel.send('', {
            embed: {
                author: {
                    name: 'Sheldonの使い方(読み上げbot)',
                    icon_url: 'https://cdn.glitch.com/4ea6ca87-8ea7-482c-ab74-7aee445ea445%2Fthumbnails%2Fbukichi.jpg',
                },
                color: 0x1bc2a5,
                fields: [{
                    name: 'ボイスチャンネルにSheldonを参加',
                    value: '```' + prefix + 'join```\n',
                },
                {
                    name: 'ボイスチャンネルへ再接続',
                    value: '```' + prefix + 'reconnect```\n',
                },
                {
                    name: '読み上げに利用するTTSのAPIを変更します',
                    value: '```' + prefix + 'mode```\n',
                },
                {
                    name: 'APIで利用可能な音声タイプを一覧表示します',
                    value: '```' + prefix + 'type```\n',
                },
                {
                    name: '音声タイプを変更します',
                    value: '```' + prefix + 'voice```\n',
                },
                {
                    name: '音声の速度を変更します(0～200の数値) ',
                    value: '```' + prefix + 'speed```\n',
                },
                {
                    name: '音声の高さを変更します(0～200の数値)',
                    value: '```' + prefix + 'pitch```\n',
                },
                ],
            },
        });
    } else {
        msg.channel.send('', {
            embed: {
                author: {
                    name: 'Sheldonの使い方',
                    icon_url: 'https://cdn.glitch.com/4ea6ca87-8ea7-482c-ab74-7aee445ea445%2Fthumbnails%2Fbukichi.jpg',
                },
                color: 0x1bc2a5,
                fields: [{
                    name: 'ステージ情報を表示[now / next / nawabari / run]',
                    value: '```' + prefix + 'show ○○○```\n',
                },
                {
                    name: '24時間後までのステージ情報を表示(リグマ/ガチマ)',
                    value: '```' + prefix + 'stageall```',
                },
                {
                    name: 'ランダム系コマンド',
                    value: 'ブキをランダムで選出：```' + prefix + 'buki 複数の場合は数字を記入```\n' +
                        'ブキ種別ごとのランダム選出方法を表示：```' + prefix + 'buki help```\n' +
                        'Choose a weapon randomly:```' + prefix + 'weapon```\n' +
                        'Choose a weapon randomly help:```' + prefix + 'weapon help```\n' +
                        'ガチルールをランダムで選出：```' + prefix + 'rule```\n' +
                        'ガチルールとステージをランダムで選出：```' + prefix + 'rule stage```\n' +
                        'サブウェポンをランダムで選出：```' + prefix + 'sub```\n' +
                        'スペシャルウェポンをランダムで選出：```' + prefix + 'special```',
                },
                {
                    name: '選択肢の中からランダム選出',
                    value: '```' + prefix + 'pick 複数選出の場合は数字を記入 選択肢を半スペ空け or 改行して記入```',
                },
                {
                    name: '接続してるボイチャから数字分のヒトをランダム抽出',
                    value: '```' + prefix + 'vpick 複数選出の場合は数字を記入```',
                },
                {
                    name: 'プラベの観戦者を抽出',
                    value: '```' + prefix + 'kansen 試合回数分の数字を記入```',
                },
                {
                    name: '自分のフレンドコードを表示',
                    value: '```' + prefix + 'fc @自分```',
                },
                {
                    name: '自分のフレンドコードを登録',
                    value: '```' + prefix + 'fcadd 0000-0000-0000```\nもう一度登録すると上書きされます。他人のは登録できません。',
                },
                {
                    name: 'wikipediaで調べる',
                    value: '```' + prefix + 'wiki 〇〇```',
                },
                {
                    name: 'Prefixの変更\r\n例：' + prefix + 'prefix !!!',
                    value: "```" + helpValuePrefix + "```",
                }],
            },
        });
    }
}