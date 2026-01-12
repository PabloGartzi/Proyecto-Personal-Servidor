const { connection } = require("../config/dbConnect");
const { alertsQuerys } = require("./alerts.querys");

const getUserEmailByID = async (user_id) => {
    let client, result;
    try {
        client = await connection();
        result = await client.query(alertsQuerys.getUserEmailByID, [user_id]);
        return result.rows[0];
    } catch (error) {
        console.log("Error obteniendo email:", error);
        return error;
    } finally {
        await client.end();
        console.log("<============== ALERTS CONNECTION CLOSED =============>");
    }
};

const createAlert = async (alertInfo) => {
    const { user_email, receiver_email, alert_title, alert_message, alert_type } = alertInfo;

    let client, result;

    try {
        client = await connection();
        result = await client.query( alertsQuerys.createAlert, [user_email, receiver_email, alert_title, alert_message, alert_type || "info"] );
        return result.rows[0];
    } catch (error) {
        console.log("Error creando alerta:", error);
        return error;
    } finally {
        await client.end();
        console.log("<============== ALERTS CONNECTION CLOSED =============>");
    }
};

const getAlertsByUser = async (userEmail) => {
    let client, result;

    try {
        client = await connection();
        result = await client.query(alertsQuerys.getAlertsByUser, [userEmail]);
        return result.rows;
    } catch (error) {
        console.log("Error obteniendo alertas:", error);
        return error;
    } finally {
        await client.end();
        console.log("<============== ALERTS CONNECTION CLOSED =============>");
    }
};

const deleteAlert = async (alertId, user_email) => {
    let client, result;

    try {
        client = await connection();
        result = await client.query(alertsQuerys.deleteAlert, [alertId, user_email]);
        return result.rows[0];
    } catch (error) {
        console.log("Error eliminando alerta:", error);
        return error;
    } finally {
        await client.end();
        console.log("<============== ALERTS CONNECTION CLOSED =============>");
    }
};

module.exports = {
    createAlert,
    getAlertsByUser,
    deleteAlert,
    getUserEmailByID
};
