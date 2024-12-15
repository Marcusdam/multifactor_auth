import express from "express";
import {
  register,
  login,
  logout,
  authStatus,
  setUp2FA,
  verify2FA,
  reset2FA,
} from "../controller/authController.js";
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.post("/login", passport.authenticate("local"), login);
router.get("/status", authStatus);
router.post("/logout", logout);

router.post(
  "/2fa/setup",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: "User is not authorized" });
  },
  setUp2FA
);
router.post(
  "/2fa/verify",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: "User is not authorized" });
  },
  verify2FA
);

router.post(
  "/2fa/reset",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: "User is not authorized" });
  },
  reset2FA
);

export default router;
