const DBCommon = require('./db.js');
const Prefixes = require('./model/prefixes');
const log4js = require('log4js');

log4js.configure(process.env.LOG4JS_CONFIG_PATH);
const logger = log4js.getLogger('database');

module.exports = class PrefixesService {
    static async createTableIfNotExists() {
        try {
            DBCommon.init();
            await DBCommon.run(`CREATE TABLE IF NOT EXISTS prefixes (
                                server_id text primary key,
                                prefix text,
                                created_at text NOT NULL DEFAULT (DATETIME('now', 'localtime')),
                                updated_at text NOT NULL DEFAULT (DATETIME('now', 'localtime'))
                    )`);
            DBCommon.close();
        } catch (err) {
            logger.error(err);
        }
    }

    static async getPrefixes(server_id) {
        const db = DBCommon.open();
        const result = [];
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all(`select * from prefixes where server_id = ${server_id}`, (err, rows) => {
                    if (err) return reject(err);
                    rows.forEach((row) => {
                        result.push(new Prefixes(row['server_id'], row['prefix'], row['created_at'], row['updated_at']));
                    });
                    DBCommon.close();
                    return resolve(result);
                });
            });
        });
    }
};
