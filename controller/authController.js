import User from "../model/user.js";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please enter both username and password" });
    };
    if (username.length < 3){
      return res.status(400).json({ message: "Username must be at least 3 characters"});
    };

    if (password.length < 6){
      return res.status(400).json({ message: "Password must be at least 6 characters"});


    }

    const existingUser = await User.findOne({username});
    if (existingUser){
      return res.status(400).json({message: "Username already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: hashedPassword,
      isMfaActive: false,
    });
    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error during registration :", message: error });
  }
};
export const login = async (req, res) => {
  console.log("User logged in successfully");
  return res.status(200).json({
    message: "User logged in successfully",
    username: req.user.username,
    isMfaActive: req.user.isMfaActive,
  });
};

export const authStatus = async (req, res) => {
  if (req.user) {
    return res.status(200).json({
      message: "User is authenticated successfully",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({ message: "User is not authenticated" });
  }
};

export const logout = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User is not authenticated" });
  }
  req.logout((error) => {
    if (error) {
      return res.status(400).json({ message: "User is not logged in" });
    }

    return res.status(200).json({ message: "User logged out successfully" });
  });
};

export const setUp2FA = async (req, res) => {
  try {
    console.log("The user is :", req.user);
    const user = req.user;
    let secret = speakeasy.generateSecret();
    console.log("The secret is :", secret);
    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: user.username,
      issuer: "My App",
      encoding: "base32",
    });
    const qrImageUrl = await qrCode.toDataURL(url);
    return res.status(200).json({
      message: "2FA set up successfully ",
      secret: secret.base32,
      qrCode: qrImageUrl,
    });
  } catch (error) {
    return res.status(200).json({ message: "Error during 2FA setup:", error });
  }
};

export const verify2FA = async (req, res) => {
  const { token } = req.body;
  const user = req.user;

  if (!token || !user) {
    return res.status(400).json({ message: "Token or user information is missing" });
  }

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token: token,

  });
  if (verified) {
    const jwtToken = jwt.sign(
      {
        username: user.username,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ message: "2FA verified successfully", token: jwtToken });
  }else{
    return res.status(400).json({message: "Invalid 2FA token"});
  }


};
export const reset2FA = async (req, res) => {
  try {
    const user = req.user;
    user.twoFactorSecret = "",
    user.isMfaActive = false;
    await user.save();
    return res.status(200).json({message: "2FA reset successfully"});


  } catch (error) {
    return res.status(500).json({message: "Error during 2FA reset", error})
  }
};
