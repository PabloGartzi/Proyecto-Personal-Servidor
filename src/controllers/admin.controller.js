const { createUser, deleteUser, findUserByEmail, getAllUsers, getUserByID, updateUser } = require("../models/admin.model")


const getAllUsersController = async (req, res) => {
    try {
        const data = await getAllUsers()
        console.log("<================ LOS USUARIOS QUE HAY SON: ================>", data)
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

const getUserByIDController = async (req, res) => {
    const id = req.params.id
    try {
        const data = await getUserByID(id)
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
const createUserController = async (req, res) => {
    const body = req.body
    try {
        const existe = await findUserByEmail(body.user_email);
        console.log(existe, "====================================EXISTE======================================")
        if(existe){
            return res.status(401).json({
                ok:false,
                msg: "Usuario ya existente"
            })
        }
        const data = await createUser(body)
        console.log("Usuario agregado:", data);
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

const updateUserController = async (req, res) => {
    const id = req.params.id
    const modificacion = req.body
    try {
        const newUser = await updateUser(id, modificacion)
        if (newUser) {
            return res.status(200).json({
                ok: true,
                msg: "Usuario actualizado",
                newUser
            })
        } else {
            return res.status(404).json({
                ok: false,
                msg: "ERROR 404, usuario no encontrado",
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

const deleteUserController = async (req, res) => {
    const id = req.params.id
    try {
        const deletedUser = await deleteUser(id)
        if (deletedUser) {
            return res.status(200).json({
                ok: true,
                msg: "usuario borrado",
                deletedUser
            })
        } else {
            return res.status(404).json({
                ok: false,
                msg: "ERROR 404, usuario no encontrado",
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
    getAllUsersController,
    getUserByIDController,
    createUserController,
    updateUserController,
    deleteUserController
}