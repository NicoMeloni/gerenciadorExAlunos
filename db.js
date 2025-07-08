const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ex_alunos_unb',
    password: 'NIcolasunb123',
    port: 5432,
});

module.exports = pool;