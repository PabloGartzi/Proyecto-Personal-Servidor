const bcrypt = require("bcryptjs");

const {findOne} = require("../models/auth.model")
const {JWTGenerator} = require("../helpers/jwt")


const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const usuario = await findOne(email);
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg: "No hay usuario con ese email"
            })
        }
        console.log({email, password})
        const passwordOk = bcrypt.compareSync(password, usuario.password_hash)
        //const passwordOk = password === usuario.password_hash //CUIDADO: esto es solo para usuarios de prueba que no tienen la contraseña hasheada.


        if(!passwordOk){
            return res.status(401).json({
                ok:false,
                msg: "La contraseña no es válida"
            })
        }
        const payload ={
            uid: usuario.user_id,
            rol: usuario.role_name
        }
        //console.log(payload)
        const token = await JWTGenerator(payload)
        return res.status(200).json({
            ok:true,
            msg: "Login de usuario",
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "Contacte con el administrador"
        })
    }
}

const renewToken = async (req, res) => {
    const {uid, rol} = req.userToken;

    const token = await JWTGenerator({uid, rol})
    return res.status(200).json({
        ok:true,
        msg: "Renew de usuario",
        usuario: {
            uid,
            rol
        },
        token
    })
} 

module.exports={
    loginUser,
    renewToken
}