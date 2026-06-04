import express from "express";
import ExpressValidator from "express-joi-validation";
import Joi from "joi";
import { verifyToken } from "../middlewares/auth.js";
import { getChannelSettings } from "../controllers/controllers.js";
import { putChannelSettings } from "../controllers/controllers.js";
import { patchChangePassword } from "../controllers/controllers.js";

const router = express.Router();

const validator = ExpressValidator.createValidator({});

const channelSettingsSchema = Joi.object({
    username: Joi.string().min(3).max(12).required(),
    description: Joi.string().min(10).max(200).required(),
    title: Joi.string().min(3).max(30).required(),
    avatarURL : Joi.string().uri().required(),
});

const passwordChangeSchema = Joi.object({
    password: Joi.string().min(6).max(12).required(),
    newPassword: Joi.string().min(6).max(12).required(),
})

router.get("/channel", verifyToken, getChannelSettings);

router.put(
    "/channel", 
    verifyToken, 
    validator.body(channelSettingsSchema), 
    putChannelSettings
);

router.patch(
    "/password",
    verifyToken,
    validator.body(passwordChangeSchema),
    patchChangePassword
);

export default router;