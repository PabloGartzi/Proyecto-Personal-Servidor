const express = require("express");
const router = express.Router();

const { getAllWorksController, getWorkByIDController, updateWorkController, getAllReportsController, downloadReportsPDF, createReportController, deleteReportController, updateReportController, getReportByIdController} = require("../controllers/worker.controller");

const { validarJWT } = require("../middlewares/validarJWT");
const { validarRol } = require("../middlewares/roles.middleware");
const { check } = require("express-validator");
const { validateInputs } = require("../middlewares/validateInputs");
const { upload } = require("../middlewares/upload");

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
    "/viewWorkReport/:id",
    [validarJWT, validarRol(["worker", "office"])],
    getAllReportsController
);

router.get(
    "/getReportById/:id",
    [validarJWT, validarRol(["worker"])],
    getReportByIdController
);

router.get(
    "/workReport/:id",
    [validarJWT, validarRol(["worker", "office"])],
    downloadReportsPDF
);

router.post("/createReport/:job_id/:worker_user_id",[validarJWT, validarRol(["worker"]), upload.single("imagen")], createReportController);

router.post("/updateReport/:report_id/:uid",[validarJWT, validarRol(["worker"]), upload.single("imagen")], updateReportController);

router.delete(
    "/deleteReport/:report_id/:uid",
    [validarJWT, validarRol(["worker"])],
    deleteReportController
);


module.exports = router;
