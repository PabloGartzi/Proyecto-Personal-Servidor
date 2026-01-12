const { getIO, connectedUsers } = require("../socket");
const { createAlert, getUserEmailByID, getAlertsByUser, deleteAlert } = require("../models/alerts.model");
const { findUserByEmail } = require("../models/admin.model");

const sendAlertController = async (req, res) => {
    try {
        const {user_email} = await getUserEmailByID(req.userToken.uid);
        console.log(user_email)
        const { receiver_email, title, message, type } = req.body;
        
        const existe = await findUserByEmail(receiver_email);
        if(!existe){
            return res.status(401).json({
                ok:false,
                msg: "NO existe ese usuario"
            })
        }
        const alert = await createAlert({ user_email, receiver_email, alert_title: title, alert_message: message, alert_type: type });

        const socketId = connectedUsers.get(receiver_email);
        if (socketId) {
            getIO().to(socketId).emit("new-alert", alert);
        }

        res.status(201).json({
            ok: true,
            alert
        });
    } catch (error) {
        console.error("Error creando alerta:", error);
        res.status(500).json({
            ok: false,
            msg: "Error enviando alerta"
        });
    }
};

const getAlertsByUserController = async (req, res) => {
    try {
        const {user_email} =  await getUserEmailByID(req.userToken.uid);
        const alerts = await getAlertsByUser(user_email);
        res.status(200).json({
            ok: true,
            alerts
        });
    } catch (error) {
            console.error("Error obteniendo alertas:", error);
            res.status(500).json({
                ok: false,
                msg: "Error al obtener alertas"
        });
    }
};

const deleteAlertController = async (req, res) => {
    try {
        const { alertId } = req.params;
        const { user_email } = await getUserEmailByID(req.userToken.uid);
        const alert = await deleteAlert(alertId, user_email);

        res.status(200).json({
            ok: true,
            alert
        });
    } catch (error) {
        console.error("Error eliminando alerta:", error);
        res.status(500).json({
            ok: false,
            msg: "Error al eliminar alerta"
        });
    }
};
module.exports = { 
    sendAlertController, 
    getAlertsByUserController, 
    deleteAlertController 
};
