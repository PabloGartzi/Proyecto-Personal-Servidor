const { createWork, deleteWork, findWorkByTitle, findWorkerIDByEmail, getAllWorks, getWorkByID, updateWork, totalWorks, worksCompleted, worksInProgress, worksPending } = require("../models/office.model")


const getAllWorksController = async (req, res) => {
    try {
        const data = await getAllWorks()
        console.log("<================ LOS TRABAJOS QUE HAY SON: ================>", data)
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
const createWorkController = async (req, res) => {
    const {job_title, job_description, job_status, job_address, job_latitude, job_longitude, user_email} = req.body
    try {
        const existe = await findWorkByTitle(job_title);
        // console.log(existe, "====================================EXISTE======================================")
        if(existe){
            return res.status(401).json({
                ok:false,
                msg: "Trabajo ya existente"
            })
        }

        const workerExists = await findWorkerIDByEmail(user_email);
        console.log(workerExists, "====================================EXISTE======================================")
        if(!workerExists){
            return res.status(401).json({
                ok:false,
                msg: "El trabajador no existe"
            })
        }

        const data = await createWork({job_title, job_description, job_status, job_address, job_latitude, job_longitude, assigned_worker_user_id: workerExists.user_id})
        console.log("Trabajo agregado:", data);
        return res.status(201).json({
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
    const {job_title, job_description, job_status, job_address, job_latitude, job_longitude, user_email} = req.body
    try {
        const workerExists = await findWorkerIDByEmail(user_email);
        console.log(workerExists, "====================================EXISTE======================================")
        if(!workerExists){
            return res.status(401).json({
                ok:false,
                msg: "El trabajador no existe"
            })
        }

        const newUser = await updateWork(id, {job_title, job_description, job_status, job_address, job_latitude, job_longitude, assigned_worker_user_id: workerExists.user_id})
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

const deleteWorkController = async (req, res) => {
    const id = req.params.id
    try {
        const deletedUser = await deleteWork(id)
        if (deletedUser) {
            return res.status(200).json({
                ok: true,
                msg: "trabajo borrado",
                deletedUser
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

const statisticsController = async (req, res) => {
    try {
        const total = await totalWorks();
        const completed = await worksCompleted();
        const inProgress = await worksInProgress();
        const pending = await worksPending();

        return res.status(200).json({
            ok: true,
            msg: "Estadísticas obtenidas correctamente",
            data: {
                total_works: Number(total.total_works),
                works_pending: Number(pending.works_pending),
                works_in_progress: Number(inProgress.works_in_progress),
                works_completed: Number(completed.works_completed)
            }
        });

    } catch (error) {
        console.error("Error en statisticsController:", error);
        return res.status(500).json({
        ok: false,
        msg: "Error, contacte con el administrador"
        });
    }
};

module.exports = {
    getAllWorksController,
    getWorkByIDController,
    createWorkController,
    updateWorkController,
    deleteWorkController,
    statisticsController
}