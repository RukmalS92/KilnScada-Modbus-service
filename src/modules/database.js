const mysql = require('mysql')
const config = require('../../config/config.json')

const con = mysql.createConnection(config.database);

//connect to database
const connectDB = () => {
    return new Promise((resolve, reject) => {
        con.connect((error) => {
            if(error){
                return reject(new Error("DB Connection Failed : ==> " + error.message + " @ " + __filename + " @ ErrorType : " + error.name))
            }
            resolve("DB Connection Success")
        });
    });
}

/* Update Data */

//update raw-temperature data table with temperature data
const updateTemperatureData = (tempdata) => {
    return new Promise((resolve, reject) => {
        const query = "insert into temp_rawdata(temp_t1, temp_t2, temp_t3, temp_t4, temp_t5, temp_t6, temp_t7, temp_t8, temp_t9, temp_t10) values(" + tempdata[0] + ", " + tempdata[1] + " , " + tempdata[2] + "," + tempdata[3] + ", " + tempdata[4] + ", " + tempdata[5] + ", " + tempdata[6] + ", " + tempdata[7] + ", " + tempdata[8] + ", " + tempdata[9] + ");"
        con.query(query, (error, results, fields) => {
            if(error){
                return reject(new Error("Temperature Raw Data update Failed : ==> " + error.message + " @ " + __filename + " @ ErrorType : " + error.name))
            }
            resolve("Success")
        })
    })
}

//update raw-motor vfd data table with vfd data
const updateVFDSpeedData = (invdata, timevalue) => {
    return new Promise((resolve, reject) => {
        const query = "insert into inv_rawdata(inv1, inv2, inv3, timevalue) values(" + invdata[0] + ", " + invdata[1] + " , " + invdata[2] + "," + timevalue + ");" 
        con.query(query, (error,results,fields) => {
            if(error){
                return reject(new Error("INVSpeed Raw Data update Failed : ==> " + error.message + " @ " + __filename + " @ ErrorType : " + error.name))
            }
            resolve("Success")
        })
    })
}


module.exports = {
    connectDB,
    updateTemperatureData,
    updateVFDSpeedData
}


