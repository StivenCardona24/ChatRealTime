import { Router } from "express";
import { check } from "express-validator";

const {
    getPerson,
    getOnePerson,
    addPerson,
    updatePerson,
    deletePerson
} = require("../controllers/person.controller");

const router = Router();

router.get("/", getPerson);

router.get("/:id", [
    check('id', 'No es un ID válido').isNumeric(),
], getOnePerson);

router.post("/", [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty()
  
],addPerson);

router.put("/:id",  [
    check('id', 'No es un ID válido').isNumeric(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty()
    
],updatePerson);

router.delete("/:id",[
    check('id', 'No es un ID válido').isNumeric(),
], deletePerson);

export default router;

