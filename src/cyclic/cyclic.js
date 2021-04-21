const shared = require('../shared/shared')
const deviceHandler = require('../modules/modbus')
const errorhandler = require('../modules/errorlog')
const database = require('../modules/database')
const config = require('../../config/config.json')

/* For testing purpose enabling only required components */
let key = 0;
if(config.controllertest === "temp"){
    key = 1;
}
else if(config.controllertest === "inv"){
    key = 2;
}
else if(config.controllertest === "both"){
    key = 0;
}
else{
    key = -1;
}

//loading database connection
database.connectDB()
.then((successEvent) => errorhandler.info(successEvent))
.catch((error) => errorhandler.error(error))

const cyclicIntervalTime = 3000

const keyFn = async (key) => {
    switch (key) {
        case 0:
            try {
                let finaltempdata = []
                let finalinvdata = []
                let rawTemp = await deviceHandler.getTemperatureData()
                let rawIn = await deviceHandler.getINVData()
                shared.temp_array = rawTemp;
                shared.inv_array = rawIn;
                rawTemp.forEach(element => {
                    finaltempdata.push(element[1]);
                });
                rawIn.forEach((element => {
                    finalinvdata.push(element[1]);
                }))
                await database.updateTemperatureData(finaltempdata)
                await database.updateVFDSpeedData(finalinvdata, 0)
            } catch (error) {
                errorhandler.error(error)
            }
            break;
    
        case 1:
            try {
       
                let finaltempdata = []
                let rawTemp = await deviceHandler.getTemperatureData()
                shared.temp_array = rawTemp;
                rawTemp.forEach(element => {
                    finaltempdata.push(element[1]);
                });
                await database.updateTemperatureData(finaltempdata)
            } catch (error) {
                errorhandler.error(error)
            }
        
            break;
    
        case 2:
            try {
                let finalinvdata = []
                let rawIn = await deviceHandler.getINVData()
                shared.inv_array = rawIn;
                rawIn.forEach((element => {
                    finalinvdata.push(element[1]);
                }))
                await database.updateVFDSpeedData(finalinvdata, 0)
            } catch (error) {
                errorhandler.error(error)
            }
            break;
    
        default:
            break;
    }
}

setInterval(async () => {
    await keyFn(key)
}, cyclicIntervalTime)

