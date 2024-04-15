import mysql from 'mysql2/promise';

export default async function conectar() {
    if (global.pool !== undefined) {
        return await global.pool.getConnection();
    }
    else {
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root', 
            password: '',
            port: 3306,
            database: 'backendfinal_CB',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, 
            idleTimeout: 360000, 
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });

        //garantindo que haja somente uma cópia desse pool para a minha aplicação
        global.pool = pool;
        return await pool.getConnection();
    }
}