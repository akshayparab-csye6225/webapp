// import config from './config/index.js';
import stoppable from 'stoppable';
import app from './api/app.js';
import http from 'http';
import mysql from 'mysql2/promise';

import _conf from './config/index.js';
global.config = _conf;

const httpServer = http.createServer(app);

const initMySQLConn = async () => {
    let dbConf = config.db;
    global.dbConn = await mysql.createPool({
        host: dbConf.host,
        user: dbConf.user,
        password: dbConf.password,
        database: dbConf.password,
        waitForConnections: dbConf.waitForConnections,
        connectionLimit: dbConf.connectionLimit,
        maxIdle: dbConf.maxIdle,
        idleTimeout: dbConf.idleTimeout,
        queueLimit: dbConf.queueLimit
    });
};

const server = stoppable(
    httpServer.listen(config.app.port || 8080, async () => {
        await initMySQLConn();
        console.log('WebApp connected to MySQL DB');
        console.log('Server listening on port', config.app.port || 8080);
    }));

const shutdown = () => {
    server.close((err) => {
        if (err) {
            console.error('Error detected during shutdown', err);
            process.exitCode = 1;
        }
        process.exit();
    });
};

// Quit on CTRL - C when running Docker in Terminal
process.on('SIGINT', () => {
    console.log('Received SIGINT, gracefully shutting down');
    shutdown();
});

// Quit on docker stop command
process.on('SIGTERM', () => {
    console.info('Received SIGTERM, gracefully shutting down');
    shutdown();
});
