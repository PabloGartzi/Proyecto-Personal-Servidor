const express = require("express");
const router = express.Router();

const { getAllWorksController, getWorkByIDController, updateWorkController, getAllReportsController} = require("../controllers/worker.controller");

const { validarJWT } = require("../middlewares/validarJWT");
const { validarRol } = require("../middlewares/roles.middleware");
const { check } = require("express-validator");
const { validateInputs } = require("../middlewares/validateInputs");

router.get(
    "/dashboard/:id",
    [validarJWT, validarRol(["worker"])],
    getAllWorksController
);

router.get(
    "/work/:id",
    [validarJWT, validarRol(["worker"])],
    getWorkByIDController
);

router.post(
    "/updateWork/:id",
    [
        validarJWT,
        validarRol(["worker"]),
        check("job_status")
            .notEmpty().withMessage("El estado es obligatorio")
            .isIn(["pendiente", "en curso", "completado"]).withMessage("Estatus no válido"),
        validateInputs
    ],
    updateWorkController
);

router.get(
    "/workReport/:id",
    [validarJWT, validarRol(["worker"])],
    getAllReportsController
);

module.exports = router;
