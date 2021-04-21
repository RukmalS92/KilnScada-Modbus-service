const express = require('express')
const logger = require('./modules/errorlog')
const cyclic = require('./cyclic/cyclic')
const mainroute = require('./routes/main')


const port = 3100;

const app = express();

app.use(mainroute)

app.listen(port, () => logger.info("Modbus Service Listening on port : " + port))