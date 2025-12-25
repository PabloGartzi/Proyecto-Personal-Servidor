const express = require("express");
const router = express.Router();
const { createUserController, deleteUserController, getAllUsersController, getUserByIDController, updateUserController} = require("../controllers/admin.controller");
const {validarJWT} = require("../middlewares/validarJWT")
const {check} = require("express-validator");
const{validateInputs}= require("../middlewares/validateInputs");
const {validarRol} = require("../middlewares/roles.middleware")




// Ruta inicio (donde están todos los usuarios)
router.get('/dashboard',[validarJWT, validarRol(["admin"])], getAllUsersController)
router.get('/dashboard/:id',[validarJWT, validarRol(["admin"])], getUserByIDController)

// Ruta crear usuario
router.post('/createUser',
    [
        validarJWT,
        validarRol(["admin"]),
        check("user_name")
            .notEmpty().withMessage("El nombre es obligatorio"),
        check("user_email")
            .isEmail().withMessage("Email no válido"),
        check("password")
            .notEmpty().withMessage("La contraseña es obligatoria"),
        check("role")
            .isIn(["admin", "office", "worker"]).withMessage("Rol no válido"),
        validateInputs
    ],
    createUserController)

//Ruta editar usuario
router.post('/updateUser/:id',
    [
        validarJWT,
        validarRol(["admin"]),
        check("user_name")
            .notEmpty().withMessage("El nombre es obligatorio"),
        check("user_email")
            .isEmail().withMessage("Email no válido"),
        check("password")
            .optional(),
        check("role")
            .isIn(["admin", "office", "worker"]).withMessage("Rol no válido"),
        validateInputs
    ],
    updateUserController
);
//Ruta borrar usuario
router.delete('/deleteUser/:id', [validarJWT, validarRol(["admin"])], deleteUserController)

module.exports = router;