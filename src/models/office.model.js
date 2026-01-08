const {connection} = require('../config/dbConnect'); 
const {officeQuerys} = require("./office.querys");
const bcrypt = require("bcryptjs");


const getAllWorks = async () => {
    let client, result
    try {
        client = await connection();
        result = await client.query(officeQuerys.getAllWorks)
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
        result = await client.query(officeQuerys.getWorkByID, [id])
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    } finally{
        await client.end()
        console.log("<==============FINAL=============>")
    }
}

const createWork = async (workInfo) => {
    const {job_title, job_description, job_status, job_address, job_latitude, job_longitude, assigned_worker_user_email} = workInfo;
    let client, result;
    try {
        client = await connection();
        result = await client.query(officeQuerys.createWork, [job_title, job_description, job_status, job_address, job_latitude, job_longitude, assigned_worker_user_email]);
        
        return result.rows;
    } catch (error) {
        console.log("Error al crear trabajo:", error);
        return error;
    } finally {
        await client.end();
    }
};

const updateWork = async (id, workInfo) => {
    const {job_title, job_description, job_status, job_address, job_latitude, job_longitude, assigned_worker_user_email} = workInfo;
    let client, result;
    try {
        client = await connection();
        result = await client.query(officeQuerys.updateWork, [id, job_title, job_description, job_status, job_address, job_latitude, job_longitude, assigned_worker_user_email]);
        return result.rows[0];
    } catch (error) {
        console.log("Error al editar trabajo:", error);
        throw error;
    } finally {
        await client.end();
    }
};

const deleteWork = async (id) => {
    let client, result;
    try {
        client = await connection();
        result = await client.query(officeQuerys.deleteWork, [id]
        );
        return result.rows[0];
    } catch (error) {
        console.log("Error al eliminar trabajo:", error);
        return error;
    } finally {
        await client.end();
    }
};

const findWorkByTitle = async (titulo) => {
    let client, result
    try {
        client = await connection();
        result = await client.query(officeQuerys.findWorkByTitle, [titulo])
        return result.rows[0] || null;
    } catch (error) {
        console.log("Error al buscar trabajo por titulo:", error);
        return error;
    } finally{
        await client.end()
        console.log("<==============CIERRE DE CONEXIÓN=============>")
    }
}

const findWorkerIDByEmail = async (user_name) => {
    let client, result
    try {
        client = await connection();
        result = await client.query(officeQuerys.findWorkerIDByEmail, [user_name])
        return result.rows[0] || null;
    } catch (error) {
        console.log("Error al buscar trabajdor por nombre:", error);
        return error;
    } finally{
        await client.end()
        console.log("<==============CIERRE DE CONEXIÓN=============>")
    }
}
const totalWorks = async () => {
    let client, result
    try {
        client = await connection();
        result = await client.query(officeQuerys.totalWorks)
        return result.rows[0] || null;
    } catch (error) {
        console.log("Error:", error);
        return error;
    } finally{
        await client.end()
        console.log("<==============CIERRE DE CONEXIÓN=============>")
    }
}
const worksPending = async () => {
    let client, result
    try {
        client = await connection();
        result = await client.query(officeQuerys.worksPending)
        return result.rows[0] || null;
    } catch (error) {
        console.log("Error:", error);
        return error;
    } finally{
        await client.end()
        console.log("<==============CIERRE DE CONEXIÓN=============>")
    }
}
const worksInProgress = async () => {
    let client, result
    try {
        client = await connection();
        result = await client.query(officeQuerys.worksInProgress)
        return result.rows[0] || null;
    } catch (error) {
        console.log("Error:", error);
        return error;
    } finally{
        await client.end()
        console.log("<==============CIERRE DE CONEXIÓN=============>")
    }
}
const worksCompleted = async () => {
    let client, result
    try {
        client = await connection();
        result = await client.query(officeQuerys.worksCompleted)
        return result.rows[0] || null;
    } catch (error) {
        console.log("Error:", error);
        return error;
    } finally{
        await client.end()
        console.log("<==============CIERRE DE CONEXIÓN=============>")
    }
}

module.exports= {
    getAllWorks,
    getWorkByID,
    createWork,
    updateWork,
    deleteWork,
    findWorkByTitle,
    findWorkerIDByEmail,
    totalWorks,
    worksPending,
    worksInProgress,
    worksCompleted
}