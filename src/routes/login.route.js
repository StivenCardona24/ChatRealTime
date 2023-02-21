import { Router } from "express";
import { check } from "express-validator";

const {
    login,
} = require("../controllers/login.controller");

const router = Router();


router.post("/", [
    check('email', 'El id del chat es obligatorio ').isEmail(),
    check('password', 'EL mensaje es obligatorio').not().isEmpty(),
   
  
],login);


export default router;

