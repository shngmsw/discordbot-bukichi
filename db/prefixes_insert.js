  
var { getPostgresClient } = require('./db.js');

module.exports = async function insert(id, prefix) {
    const db = await getPostgresClient();
    try {
        const sql = "INSERT INTO prefixes (server_id, prefix, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) "
            + "ON CONFLICT ON CONSTRAINT prefixes_pkey "
            + "DO UPDATE SET prefix=$2, updated_at=NOW()";
        const params = [id, prefix];

        await db.begin();
        await db.execute(sql, params);
        await db.commit();

    } catch (e) {
        await db.rollback();
        throw e;
    } finally {
        await db.release();
    }
}