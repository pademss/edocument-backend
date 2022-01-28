const Client = require('pg').Client;

const pool = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
});

pool.connect((err) =>{
        if (err) {
                console.error(err);
                return;
        }
        console.log('Database Connected');
});


module.exports={
        pool
}