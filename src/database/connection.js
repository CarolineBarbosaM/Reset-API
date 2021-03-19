var knex = require('knex')({
    client: process.env.CONNECTION,
    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: '',
        database: process.env.DATABASE
    }
});

module.exports = knex;