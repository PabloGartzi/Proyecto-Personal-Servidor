const express = require("express")
const router = express.Router()

const {createUser, loginUser, renewToken} = require("../controllers/auth.controller")
const {validarJWT} = require("../middlewares/validarJWT")
const {check} = require("express-validator");
const{validateInputs}= require("../middlewares/validateInputs");

//LOGIN
router.post('/login',[
    check("email")
        .not().isEmpty().withMessage("Debes escribir el email")
        .isEmail().withMessage("Debes escribir un email correcto")
        .isLength({min:1, max:100}).withMessage("No tiene la logitud correcta"),
    check("password")
        .not().isEmpty().withMessage("Debes escribir la contraseña")
        .isLength({min:1, max:250}).withMessage("La contraseña no tiene la longitud correcta"),
    validateInputs], loginUser)

//RENEWTOKEN
router.post('/renew', [validarJWT] , renewToken)


module.exports=router;