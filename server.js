// import config from './config/index.js';
import stoppable from 'stoppable';
import app from './api/app.js';
import http from 'http';
import mysql from 'mysql2/promise';

const httpServer = http.createServer(app);

const initMySQLConn = async () => {
    global.dbConn = await mysql.createPool({
        host: 'localhost',
        user: 'webapp',
        password: 'webapp',
        database: 'csye6225',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0
      });
  };

const server = stoppable(
    httpServer.listen(8080, async () => {
      await initMySQLConn(); 
      console.log('WebApp connected to MySQL DB');
      console.log('Server listening on port', 8080);
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
process.on('SIGINT', ()=>{
  console.log('Received SIGINT, gracefully shutting down');
  shutdown();
});

// Quit on docker stop command
process.on('SIGTERM', () => {
  console.info('Received SIGTERM, gracefully shutting down');
  shutdown();
});
