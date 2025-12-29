const {connection} = require('../config/dbConnect'); 
const {workerQuerys} = require("./worker.querys");
const bcrypt = require("bcryptjs");


const getAllWorks = async (id) => {
    let client, result
    try {
        client = await connection();
        result = await client.query(workerQuerys.getAllWorks, [id])
        console.log(result.rows, "COLUMNAS")
        return result.rows;
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    } finally{
        await client.end()
        console.log("<==============CIERRE DE CONEXIÓN=============>")
    }
}

const getWorkByID = async (id) => {
    let client, result
    try {
        client = await connection();
        result = await client.query(workerQuerys.getWorkByID, [id])
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    } finally{
        await client.end()
        console.log("<==============FINAL=============>")
    }
}

const updateWork = async (id, workInfo) => {
    const {job_status} = workInfo;
    let client, result;
    try {
        client = await connection();
        result = await client.query(workerQuerys.updateWork, [id, job_status]);
        return result.rows[0];
    } catch (error) {
        console.log("Error al editar usuario:", error);
        throw error;
    } finally {
        await client.end();
    }
};



module.exports= {
    getAllWorks,
    getWorkByID,
    updateWork,
}