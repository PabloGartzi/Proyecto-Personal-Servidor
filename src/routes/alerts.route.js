const express = require("express");
const router = express.Router();

const { sendAlertController, getAlertsByUserController, markAlertAsReadController, deleteAlertController } = require("../controllers/alerts.controller");
const { validarJWT } = require("../middlewares/validarJWT");
const { validarRol } = require("../middlewares/roles.middleware");
const { check } = require("express-validator");
const { validateInputs } = require("../middlewares/validateInputs");

router.post(
  "/send",
  [
    validarJWT,
    validarRol(["office"]),
    check("receiver_email")
      .notEmpty().withMessage("El worker es obligatorio")
      .isEmail().withMessage("Email de usuario no válido"),
    check("title")
      .notEmpty().withMessage("El título es obligatorio"),
    check("message")
      .notEmpty().withMessage("El mensaje es obligatorio"),
    validateInputs
  ],
  sendAlertController
);

router.get(
  "/get",
  [
    validarJWT,
    validarRol(["worker"]),
  ],
  getAlertsByUserController
);


router.delete(
  "/:alertId",
  [
    validarJWT,
    validarRol(["worker"]),
  ],
  deleteAlertController
);


module.exports = router;
