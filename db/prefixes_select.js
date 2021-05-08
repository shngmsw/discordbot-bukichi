var { getPostgresClient } = require('./db.js');

module.exports = async function getPrefixes(id) {
    const db = await getPostgresClient();
    let result;
    try {
        const sql = "SELECT * FROM prefixes WHERE server_id = $1";
        const params = [id];

        result = await db.execute(sql, params);

    } finally {
        await db.release();
        return result;
    }
}