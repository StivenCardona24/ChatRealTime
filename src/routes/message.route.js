import { Router } from "express";
import { check } from "express-validator";

const {
    addMessage,
    deleteMessage
} = require("../controllers/message.controller");

const router = Router();


router.post("/", [
    check('id_chat', 'El id del chat es obligatorio ').isNumeric(),
    check('message', 'EL mensaje es obligatorio').not().isEmpty(),
    check('id_personSend', 'El id del chat es obligatorio ').isNumeric(),
  
],addMessage);

router.delete("/:id",[
    check('id', 'No es un ID válido').isNumeric(),
], deleteMessage);

export default router;

