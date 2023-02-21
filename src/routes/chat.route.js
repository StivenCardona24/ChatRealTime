import { Router } from "express";
import { check } from "express-validator";

const {
    getChat,
    getOneChat,
    addChat,
    updateChat,
    deleteChat
} = require("../controllers/chat.controller");

const router = Router();

router.get("/", getChat);

router.post("/messages", [
    check('id_person1', 'la persona 1 es obligatoria').not().isEmpty(),
    check('id_person2', 'la persona 1 es obligatoria').not().isEmpty(),
], getOneChat);

router.post("/", [
    check('id_person1', 'la persona 1 es obligatoria').not().isEmpty(),
    check('id_person2', 'la persona 1 es obligatoria').not().isEmpty(),
  
],addChat);

router.put("/:id",  [
    check('id_person1', 'la persona 1 es obligatoria').not().isEmpty(),
    check('id_person2', 'la persona 1 es obligatoria').not().isEmpty(),
    
],updateChat);

router.delete("/:id",[
    check('id', 'No es un ID válido').isNumeric(),
], deleteChat);

export default router;

