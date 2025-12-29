const { getAllWorks, getWorkByID, updateWork } = require("../models/worker.model")

const getAllWorksController = async (req, res) => {
    const id = req.params.id
    try {
        const data = await getAllWorks(id)
        console.log("<================ LOS TRABAJOS QUE REALIZA ESTE TRABAJADOR SON: ================>", data)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "TODO MAL, CONTACTA CON EL ADMIN"
        })
    }
}

const getWorkByIDController = async (req, res) => {
    const id = req.params.id
    try {
        const data = await getWorkByID(id)
        console.log(data)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "TODO MAL, CONTACTA CON EL ADMIN"
        })
    }
}

const updateWorkController = async (req, res) => {
    const id = req.params.id
    const { job_status } = req.body
    try {
        const newUser = await updateWork(id, {job_status})
        if (newUser) {
            return res.status(200).json({
                ok: true,
                msg: "Trabajo actualizado",
                newUser
            })
        } else {
            return res.status(404).json({
                ok: false,
                msg: "ERROR 404, trabajo no encontrado",
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error, contacte con el administrador',
        })
    }
}




module.exports = {
    getAllWorksController,
    getWorkByIDController,
    updateWorkController
}