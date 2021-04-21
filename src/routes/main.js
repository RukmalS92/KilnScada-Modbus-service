const router = require('express').Router();
const bodyparser = require('body-parser')
const deviceHandler = require('../modules/modbus')
const errorhandler = require('../modules/errorlog');
const shared = require('../shared/shared')
const moment = require('moment')

//handle json body
router.use(bodyparser.json());

//get temperature data from all temperature modules
router.get('/temp', async (req,res) => {
    try {
        let data = shared.temp_array
        let dataObject = {
            values : data,
            logtime : moment().format()
        }
        res.send(dataObject)
    } catch (error) {
        errorhandler.error(error)   
        res.status(200).send({Error : error.message});
    }
})

//get speed data from all inverter modules
router.get('/inv', async (req,res) => {
    try {
        let data = shared.inv_array;
        let dataObject = {
            values,
            logtime : moment().format()
        }
        res.send(dataObject)
    } catch (error) {
        errorhandler.error(error)   
        res.status(501).send({Error : error});
    }
})

module.exports = router;