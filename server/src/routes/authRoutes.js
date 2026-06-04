import express from "express";
import Joi from "joi";
import ExpressValidator from "express-joi-validation";

import { postLogin, postRegister } from "../controllers/controllers.js";

const validator = ExpressValidator.createValidator({});

const registerSchema = Joi.object({
    username : Joi.string().min(3).max(30).required(),
    password : Joi.string().min(3).max(30).required(),
    email : Joi.string().email().required()
    // preference_method : Joi.string().required().valid('email', 'phone_no'),
    // email : Joi.when('preference_method', { is: 'email', then: Joi.string().email().required() }),
    // phone_no : Joi.when('preference_method', { is: 'phone_no', then: Joi.string().required() })
});
//apply method of preference between contact no. and email
const loginSchema = Joi.object({
    password : Joi.string().min(3).max(30).required(),
    email : Joi.string().email().required()
});

const router = express.Router();

router.post("/register", validator.body(registerSchema), postRegister);

router.post("/login", validator.body(loginSchema), postLogin);

export default router;