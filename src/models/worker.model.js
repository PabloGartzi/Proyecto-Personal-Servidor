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
        console.log("Error al editar el estado del trabajo:", error);
        throw error;
    } finally {
        await client.end();
    }
};

const getAllReports = async (id) => {
    let client, result;
    try {
        client = await connection();
        result = await client.query(workerQuerys.getAllReports, [id]);
        return result.rows;
    } catch (error) {
        console.log("Error al obtener los reportes:", error);
        throw error;
    } finally {
        await client.end();
    }
};

const createReport = async (job_id, worker_user_id, report_notes, report_photo_url, job_uuid, user_email) => {
    let client, result;
    try {
        client = await connection();
        result = await client.query(workerQuerys.createReport, [job_id, worker_user_id, report_notes, report_photo_url, user_email, job_uuid]);
        return result.rows;
    } catch (error) {
        console.log("Error al obtener los reportes:", error);
        throw error;
    } finally {
        await client.end();
    }
};

const deleteReport = async (id) => {
    let client, result;
    try {
        client = await connection();
        result = await client.query(workerQuerys.deleteReport, [id]);
        return result.rows[0];
    } catch (error) {
        console.log("Error al eliminar reporte:", error);
        return error;
    } finally {
        await client.end();
    }
};

const updateReport = async (report_id, report_notes, report_photo_url) => {
    let client, result;
    try {
        client = await connection();
        result = await client.query(workerQuerys.updateReport, [report_id, report_notes, report_photo_url]);
        return result.rows[0];
    } catch (error) {
        console.log("Error al actualizar reporte:", error);
        return error;
    } finally {
        await client.end();
    }
};

const getReportById = async (report_id) => {
    let client, result;
    try {
        client = await connection();
        result = await client.query(workerQuerys.getReportById, [report_id]);
        return result.rows[0];
    } catch (error) {
        console.log("Error al buscar reporte:", error);
        return error;
    } finally {
        await client.end();
    }
};

const getUserById = async (id) => {
    let client, result
    try {
        client = await connection();
        result = await client.query(workerQuerys.getUserById, [id])
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    } finally{
        await client.end()
        console.log("<==============FINAL=============>")
    }
}

module.exports= {
    getAllWorks,
    getWorkByID,
    updateWork,
    getAllReports,
    createReport,
    deleteReport,
    updateReport,
    getReportById,
    getUserById
}