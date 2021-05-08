module.exports = function handleHelp(msg) {
    var strCmd = msg.content.replace(/　/g, ' ');
    strCmd = strCmd.replace('  ', ' ');
    const args = strCmd.split(' ');
    args.shift();
    if (args[0] == 'voice') {
        msg.channel.send('', {
            embed: {
                author: {
                    name: 'ブキチの使い方(読み上げbot)',
                    icon_url: 'https://cdn.glitch.com/4ea6ca87-8ea7-482c-ab74-7aee445ea445%2Fthumbnails%2Fbukichi.jpg',
                },
                color: 0x1bc2a5,
                fields: [{
                    name: 'ボイスチャンネルにブキチを参加',
                    value: '```!!join```\n',
                },
                {
                    name: 'ボイスチャンネルへ再接続',
                    value: '```!!reconnect```\n',
                },
                {
                    name: '読み上げに利用するTTSのAPIを変更します',
                    value: '```!!mode```\n',
                },
                {
                    name: 'APIで利用可能な音声タイプを一覧表示します',
                    value: '```!!type```\n',
                },
                {
                    name: '音声タイプを変更します',
                    value: '```!!voice```\n',
                },
                {
                    name: '音声の速度を変更します(0～200の数値) ',
                    value: '```!!speed```\n',
                },
                {
                    name: '音声の高さを変更します(0～200の数値)',
                    value: '```!!pitch```\n',
                },
                ],
            },
        });
    } else {
        msg.channel.send('', {
            embed: {
                author: {
                    name: 'ブキチの使い方',
                    icon_url: 'https://cdn.glitch.com/4ea6ca87-8ea7-482c-ab74-7aee445ea445%2Fthumbnails%2Fbukichi.jpg',
                },
                color: 0x1bc2a5,
                fields: [{
                    name: 'ステージ情報を表示[now / next / nawabari / run]',
                    value: '```!!show ○○○```\n',
                },
                {
                    name: '24時間後までのステージ情報を表示(リグマ/ガチマ)',
                    value: '```!!stageall```',
                },
                {
                    name: 'ランダム系コマンド',
                    value: 'ブキをランダムで選出：```!!buki 複数の場合は数字を記入```\n' +
                        'ブキ種別ごとのランダム選出方法を表示：```!!buki help```\n' +
                        'Choose a weapon randomly:```weapon```\n' +
                        'Choose a weapon randomly help:```!!weapon help```\n' +
                        'ガチルールをランダムで選出：```!!rule```\n' +
                        'ガチルールとステージをランダムで選出：```!!rule stage```\n' +
                        'サブウェポンをランダムで選出：```!!sub```\n' +
                        'スペシャルウェポンをランダムで選出：```!!special```',
                },
                {
                    name: '選択肢の中からランダム選出',
                    value: '```!!pick 複数選出の場合は数字を記入 選択肢を半スペ空け or 改行して記入```',
                },
                {
                    name: '接続してるボイチャから数字分のヒトをランダム抽出',
                    value: '```!!vpick 複数選出の場合は数字を記入```',
                },
                {
                    name: 'プラベの観戦者を抽出',
                    value: '```!!kansen 試合回数分の数字を記入```',
                },
                {
                    name: '自分のフレンドコードを表示',
                    value: '```!!fc @自分```',
                },
                {
                    name: '自分のフレンドコードを登録',
                    value: '```!!fcadd 0000-0000-0000```\nもう一度登録すると上書きされます。他人のは登録できません。',
                },
                {
                    name: 'wikipediaで調べる',
                    value: '```!!wiki 〇〇```',
                },
                {
                    name: 'Prefixの変更\r\n例：' + prefix + 'prefix !!!',
                    value: "```" + helpValuePrefix + "```",
                }],
            },
        });
    }
}