module.exports = {
    isInteger: isInteger,
    getOpen: getOpen,
    getChallenge: getChallenge,
    getXMatch: getXMatch,
    getLeague: getLeague,
    getRegular: getRegular,
    checkFes: checkFes,
    sp3unixTime2hm: sp3unixTime2hm,
    sp3unixTime2mdwhm: sp3unixTime2mdwhm,
    sp3unixTime2ymdw: sp3unixTime2ymdw,
    sp3rule2txt: sp3rule2txt,
    sp3stage2txt: sp3stage2txt,
    sp3coop_stage2txt: sp3coop_stage2txt,
    rgbToHex: rgbToHex,
    random: randomSelect,
    getPrefix: getPrefix,
    isEmpty: isEmpty,
    isNotEmpty: isNotEmpty,
};
const PrefixesService = require('../db/prefixes_service.js');
const DEFAULT_PREFIX = '!!';

function rgbToHex(r, g, b) {
    [r, g, b]
        .map((x) => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        })
        .join('');
}

function unixTime2hm(intTime) {
    const d = new Date(intTime * 1000 + 9 * 60 * 60 * 1000);
    const month = d.getUTCMonth() + 1;
    const day = d.getUTCDate();
    const hour = d.getUTCHours();
    const min = ('0' + d.getUTCMinutes()).slice(-2);
    const dow = d.getUTCDay();
    const week = ['日', '月', '火', '水', '木', '金', '土'][dow];
    return hour + ':' + min;
}

function sp3unixTime2hm(datetime) {
    const date = new Date(datetime);
    const d = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC = UTC + 9
    const hour = d.getUTCHours();
    const min = ('0' + d.getUTCMinutes()).slice(-2);
    return hour + ':' + min;
}

function unixTime2mdwhm(intTime) {
    const d = new Date(intTime * 1000 + 9 * 60 * 60 * 1000);
    const month = d.getUTCMonth() + 1;
    const day = d.getUTCDate();
    const hour = d.getUTCHours();
    const min = ('0' + d.getUTCMinutes()).slice(-2);
    const dow = d.getUTCDay();
    const week = ['日', '月', '火', '水', '木', '金', '土'][dow];
    return month + '/' + day + '(' + week + ') ' + hour + ':' + min;
}

function sp3unixTime2mdwhm(datetime) {
    const date = new Date(datetime);
    const d = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC = UTC + 9
    const month = d.getUTCMonth() + 1;
    const day = d.getUTCDate();
    const hour = d.getUTCHours();
    const min = ('0' + d.getUTCMinutes()).slice(-2);
    const dow = d.getUTCDay();
    const week = ['日', '月', '火', '水', '木', '金', '土'][dow];
    return month + '/' + day + '(' + week + ') ' + hour + ':' + min;
}

function sp3unixTime2ymdw(datetime) {
    const date = new Date(datetime);
    const d = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC = UTC + 9
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth() + 1;
    const day = d.getUTCDate();
    const dow = d.getUTCDay();
    const week = ['日', '月', '火', '水', '木', '金', '土'][dow];
    return year + '/' + month + '/' + day + ' (' + week + ')';
}

function sp3rule2txt(name) {
    switch (name) {
        case 'Turf War':
            return 'ナワバリバトル';
        case 'Tower Control':
            return 'ガチヤグラ';
        case 'Splat Zones':
            return 'ガチエリア';
        case 'Rainmaker':
            return 'ガチホコバトル';
        case 'Clam Blitz':
            return 'ガチアサリ';
    }
}

function sp3stage2txt(key) {
    switch (key) {
        case 1:
            return 'ユノハナ大渓谷';
        case 2:
            return 'ゴンズイ地区';
        case 3:
            return 'ヤガラ市場';
        case 4:
            return 'マテガイ放水路';
        // case 5:
        //     return '';
        case 6:
            return 'ナメロウ金属';
        // case 7:
        //     return '';
        // case 8:
        //     return '';
        // case 9:
        //     return '';
        case 10:
            return 'マサバ海峡大橋';
        case 11:
            return 'キンメダイ美術館';
        case 12:
            return 'マヒマヒリゾート＆スパ';
        case 13:
            return '海女美術大学';
        case 14:
            return 'チョウザメ造船';
        case 15:
            return 'ザトウマーケット';
        case 16:
            return 'スメーシーワールド';
        // case 17:
        //     return '';
        // case 18:
        //     return '';
        // case 19:
        //     return '';
        // case 20:
        //     return '';
        // case 21:
        //     return '';
        // case 22:
        //     return '';
        // case 9999:
        //     return '';
        default:
            return 'そーりー・あんでふぁいんど';
    }
}

function sp3coop_stage2txt(key) {
    switch (key) {
        // case 0:
        //     return '';
        case 1:
            return 'シェケナダム';
        case 2:
            return 'アラマキ砦';
        // case 3:
        //     return '';
        // case 4:
        //     return '';
        // case 5:
        //     return '';
        // case 6:
        //     return '';
        case 7:
            return 'ムニ・エール海洋発電所';
        // case 8:
        //     return '';
        default:
            return 'そーりー・あんでふぁいんど';
    }
}

function getLeague(data, x) {
    let stage;
    let date;
    let rule;
    let rstr;
    date = unixTime2mdwhm(data.league[x].start_time) + ' – ' + unixTime2hm(data.league[x].end_time);
    rule = rule2txt(data.league[x].rule.key);
    stage = stage2txt(data.league[x].stage_a.id) + '\n' + stage2txt(data.league[x].stage_b.id) + '\n';
    rstr = date + ',' + rule + ',' + stage;
    console.log(rstr);
    return rstr;
}

function getGachi(data, x) {
    let stage;
    let date;
    let rule;
    let rstr;
    date = unixTime2mdwhm(data.gachi[x].start_time) + ' – ' + unixTime2hm(data.gachi[x].end_time);
    rule = rule2txt(data.gachi[x].rule.key);
    stage = stage2txt(data.gachi[x].stage_a.id) + '\n' + stage2txt(data.gachi[x].stage_b.id) + '\n';
    rstr = date + ',' + rule + ',' + stage;
    console.log(rstr);
    return rstr;
}

function getLeague(data, x) {
    let stage;
    let date;
    let rule;
    date = sp3unixTime2ymdw(data[x].startTime) + ' ' + sp3unixTime2hm(data[x].startTime) + ' – ' + sp3unixTime2hm(data[x].endTime);
    if (data[x].leagueMatchSettingleagueMatchSetting == null) {
        rule = 'フェス期間中';
        stage = 'フェス期間中はお休みでし';
    } else {
        rule = sp3rule2txt(data[x].leagueMatchSetting.vsRule.name);
        stage =
            sp3stage2txt(data[x].leagueMatchSetting.vsStages[0].vsStageId) +
            '／' +
            sp3stage2txt(data[x].leagueMatchSetting.vsStages[1].vsStageId);
    }
    return date + ',' + rule + ',' + stage;
}

function getOpen(data, x) {
    let stage;
    let date;
    let rule;
    date = sp3unixTime2ymdw(data[x].startTime) + ' ' + sp3unixTime2hm(data[x].startTime) + ' – ' + sp3unixTime2hm(data[x].endTime);
    if (data[x].bankaraMatchSettings == null) {
        rule = 'フェス期間中';
        stage = 'フェス期間中はお休みでし';
    } else {
        rule = sp3rule2txt(data[x].bankaraMatchSettings[1].vsRule.name);
        stage =
            sp3stage2txt(data[x].bankaraMatchSettings[1].vsStages[0].vsStageId) +
            '／' +
            sp3stage2txt(data[x].bankaraMatchSettings[1].vsStages[1].vsStageId);
    }
    return date + ',' + rule + ',' + stage;
}

function getChallenge(data, x) {
    let stage;
    let date;
    let rule;
    date = sp3unixTime2ymdw(data[x].startTime) + ' ' + sp3unixTime2hm(data[x].startTime) + ' – ' + sp3unixTime2hm(data[x].endTime);
    if (data[x].bankaraMatchSettings == null) {
        rule = 'フェス期間中';
        stage = 'フェス期間中はお休みでし';
    } else {
        rule = sp3rule2txt(data[x].bankaraMatchSettings[0].vsRule.name);
        stage =
            sp3stage2txt(data[x].bankaraMatchSettings[0].vsStages[0].vsStageId) +
            '／' +
            sp3stage2txt(data[x].bankaraMatchSettings[0].vsStages[1].vsStageId);
    }
    return date + ',' + rule + ',' + stage;
}

function getXMatch(data, x) {
    let stage;
    let date;
    let rule;
    date = sp3unixTime2ymdw(data[x].startTime) + ' ' + sp3unixTime2hm(data[x].startTime) + ' – ' + sp3unixTime2hm(data[x].endTime);
    if (data[x].xMatchSetting == null) {
        rule = 'フェス期間中';
        stage = 'フェス期間中はお休みでし';
    } else {
        rule = sp3rule2txt(data[x].xMatchSetting.vsRule.name);
        stage =
            sp3stage2txt(data[x].xMatchSetting.vsStages[0].vsStageId) + '／' + sp3stage2txt(data[x].xMatchSetting.vsStages[1].vsStageId);
    }
    return date + ',' + rule + ',' + stage;
}

/**
 * レギュラーマッチステージ情報取得
 * フェス期間中はフェス情報を取得する
 */
function getRegular(data, x) {
    let stage1;
    let stage2;
    let date;
    let time;
    let rule;
    let matchName;
    let iconURL;
    let color;
    if (checkFes(data, x)) {
        const fest_list = data.data.festSchedules.nodes;
        const f_setting = fest_list[x].festMatchSetting;

        date = sp3unixTime2ymdw(fest_list[x].startTime);
        time = sp3unixTime2hm(fest_list[x].startTime) + ' – ' + sp3unixTime2hm(fest_list[x].endTime);
        rule = sp3rule2txt(f_setting.vsRule.name);
        stage1 = sp3stage2txt(f_setting.vsStages[0].vsStageId);
        stage2 = sp3stage2txt(f_setting.vsStages[1].vsStageId);
        matchName = 'フェスマッチ';
        iconURL = 'https://raw.githubusercontent.com/shngmsw/ikabu/main/images/recruit/fes_icon.png';
        color = '#ead147';
    } else {
        const regular_list = data.data.regularSchedules.nodes;
        const r_setting = regular_list[x].regularMatchSetting;

        date = sp3unixTime2ymdw(regular_list[x].startTime);
        time = sp3unixTime2hm(regular_list[x].startTime) + ' – ' + sp3unixTime2hm(regular_list[x].endTime);
        rule = sp3rule2txt(r_setting.vsRule.name);
        stage1 = sp3stage2txt(r_setting.vsStages[0].vsStageId);
        stage2 = sp3stage2txt(r_setting.vsStages[1].vsStageId);
        matchName = 'レギュラーマッチ';
        iconURL = 'https://raw.githubusercontent.com/shngmsw/ikabu/main/images/recruit/regular_icon.png';
        color = '#B3FF00';
    }
    return {
        date: date,
        time: time,
        rule: rule,
        stage1: stage1,
        stage2: stage2,
        matchName: matchName,
        iconURL: iconURL,
        color: color,
    };
}

/**
 * フェス期間中かチェックする
 */
function checkFes(data, type) {
    const fest_list = data.data.festSchedules.nodes;
    const f_setting = fest_list[type].festMatchSetting;
    if (f_setting == null) {
        return false;
    } else {
        return true;
    }
}
function isInteger(x) {
    return Math.round(x) === x;
}

function randomSelect(array, num) {
    var a = array;
    var t = [];
    var r = [];
    var l = a.length;
    var n = num < l ? num : l;
    while (n-- > 0) {
        var i = (Math.random() * l) | 0;
        r[n] = t[i] || a[i];
        --l;
        t[i] = t[l] || a[l];
    }
    return r;
}

async function getPrefix(msg) {
    const serverId = msg.channel.type == 'dm' ? msg.channel.id : msg.guild.id;
    let prefix = DEFAULT_PREFIX;
    const serverPrefix = await PrefixesService.getPrefixes(serverId);
    if (serverPrefix[0] != null) {
        prefix = serverPrefix[0].prefix;
    }
    return prefix;
}

/**
 * IsEmpty
 * @param obj {any} - Target Object
 */
function isEmpty(obj) {
    if (obj === undefined || obj === null) {
        return true;
    } else if (Object.prototype.toString.call(obj).slice(8, -1) === 'String') {
        if (obj === '') {
            return true;
        }
    } else if (Object.prototype.toString.call(obj).slice(8, -1) === 'Array') {
        if (obj.length === 0) {
            return true;
        }
    } else if (Object.prototype.toString.call(obj).slice(8, -1) === 'Object') {
        if (!Object.keys(obj).length) {
            return true;
        }
    }
    return false;
}

/**
 * IsNotEmpty
 * @param obj {any} - Target Object
 */
function isNotEmpty(obj) {
    return !isEmpty(obj);
}

function randomSelect(array, num) {
    var a = array;
    var t = [];
    var r = [];
    var l = a.length;
    var n = num < l ? num : l;
    while (n-- > 0) {
        var i = (Math.random() * l) | 0;
        r[n] = t[i] || a[i];
        --l;
        t[i] = t[l] || a[l];
    }
    return r;
}
/*
 *  日数または月数を加算
 *
 *  dt: 基準となる Date オブジェクト
 *  dd: 日数または月数
 *   u: 'D': dd は日数
 *      'M': dd は月数
 *
 */
function dateAdd(dt, dd, u) {
    var y = dt.getFullYear();
    var m = dt.getMonth();
    var d = dt.getDate();
    var r = new Date(y, m, d);
    if (typeof u === 'undefined' || u == 'D') {
        r.setDate(d + dd);
    } else if (u == 'M') {
        m += dd;
        y += parseInt(m / 12);
        m %= 12;
        var e = new Date(y, m + 1, 0).getDate();
        r.setFullYear(y, m, d > e ? e : d);
    }
    return r;
}

/*
 *  経過年・月・日数の計算
 *
 *  dt1: 開始年月日の Date オブジェクト
 *  dt2: 終了年月日の Date オブジェクト
 *    u:  'Y': 経過年数を求める
 *        'M': 経過月数を求める
 *        'D': 経過日数を求める
 *       'YM': 1年に満たない月数
 *       'MD': 1ヶ月に満たない日数
 *       'YD': 1年に満たない日数
 *    f: true: 初日算入
 *      false: 初日不算入
 *
 */
function dateDiff(dt1, dt2, u, f) {
    if (typeof dt2 == 'undefined') dt2 = new Date();
    if (f) dt1 = dateAdd(dt1, -1, 'D');
    var y1 = dt1.getFullYear();
    var m1 = dt1.getMonth();
    var y2 = dt2.getFullYear();
    var m2 = dt2.getMonth();
    var dt3,
        r = 0;
    if (typeof u === 'undefined' || u == 'D') {
        r = parseInt((dt2 - dt1) / (24 * 3600 * 1000));
    } else if (u == 'M') {
        r = y2 * 12 + m2 - (y1 * 12 + m1);
        dt3 = dateAdd(dt1, r, 'M');
        if (dateDiff(dt3, dt2, 'D') < 0) --r;
    } else if (u == 'Y') {
        r = parseInt(dateDiff(dt1, dt2, 'M') / 12);
    } else if (u == 'YM') {
        r = dateDiff(dt1, dt2, 'M') % 12;
    } else if (u == 'MD') {
        r = dateDiff(dt1, dt2, 'M');
        dt3 = dateAdd(dt1, r, 'M');
        r = dateDiff(dt3, dt2, 'D');
    } else if (u == 'YD') {
        r = dateDiff(dt1, dt2, 'Y');
        dt3 = dateAdd(dt1, r * 12, 'M');
        r = dateDiff(dt3, dt2, 'D');
    }
    return r;
}
/*
 *  経過時間（分）の計算
 */
function datetimeDiff(dt1, dt2) {
    diff = dt2.getTime() - dt1.getTime();
    const diffMinutes = Math.abs(diff) / (60 * 1000);
    return diffMinutes;
}
