const express = require("express");
const router = express.Router();

const { getAllWorksController, getWorkByIDController, createWorkController, updateWorkController, deleteWorkController} = require("../controllers/office.controller");

const { validarJWT } = require("../middlewares/validarJWT");
const { validarRol } = require("../middlewares/roles.middleware");
const { check } = require("express-validator");
const { validateInputs } = require("../middlewares/validateInputs");

router.get(
    "/dashboard",
    [validarJWT, validarRol(["office"])],
    getAllWorksController
);

router.get(
    "/dashboard/:id",
    [validarJWT, validarRol(["office"])],
    getWorkByIDController
);

router.post(
    "/createWork",
    [
        validarJWT,
        validarRol(["office"]),
        check("job_title")
            .notEmpty().withMessage("El título del trabajo es obligatorio"),
        check("job_description")
            .notEmpty().withMessage("La descripción es obligatoria"),
        check("job_status")
            .notEmpty().withMessage("El estado es obligatorio"),
        check("job_address")
            .notEmpty().withMessage("La dirección es obligatoria"),
        check("job_latitude")
            .notEmpty().withMessage("La latitud es obligatoria"),
        check("job_longitude")
            .notEmpty().withMessage("La longitud es obligatoria"),
        check("user_email")
            .isEmail().withMessage("Email no válido"),
        validateInputs
    ],
    createWorkController
);

router.post(
    "/updateWork/:id",
    [
        validarJWT,
        validarRol(["office"]),
        check("job_title")
            .notEmpty().withMessage("El título del trabajo es obligatorio"),
        check("job_description")
            .notEmpty().withMessage("La descripción es obligatoria"),
        check("job_status")
            .notEmpty().withMessage("El estado es obligatorio"),
        check("job_address")
            .notEmpty().withMessage("La dirección es obligatoria"),
        check("job_latitude")
            .notEmpty().withMessage("La latitud es obligatoria"),
        check("job_longitude")
            .notEmpty().withMessage("La longitud es obligatoria"),
        check("user_email")
            .isEmail().withMessage("Email no válido"),
        validateInputs
    ],
    updateWorkController
);

router.delete(
    "/deleteWork/:id",
    [validarJWT, validarRol(["office"])],
    deleteWorkController
);

module.exports = router;
