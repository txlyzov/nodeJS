const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const HSC = require('http-status-codes');
const routers = require('./routes');
const config = require('./config/index').development;

const app = express();

const HOST = config.connection.host || 'localhost';
const PORT = config.connection.port || 3000;

app.use(helmet());
app.use(morgan('combined'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/', routers.usersRouter);
app.use('/', routers.imagesRouter);

app.use((req, res) => {
  res.status(HSC.NOT_FOUND).send('404: No page here.');
});

app.listen(PORT, () => console.log(`API running at ${HOST}:${PORT}!`));
