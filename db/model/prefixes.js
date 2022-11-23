module.exports = class Prefixes {
    constructor(server_id, prefix, created_at, updated_at) {
        this.server_id = server_id;
        this.prefix = prefix;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
};
