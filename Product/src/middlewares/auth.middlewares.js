import JWt from "jsonwebtoken";
import { Auth } from "../model/auth.model.js";

export const verify = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "User is not authorize" });
    }

    const decode = JWt.verify(token, "darshilpatel");

    const user = await Auth.findById(decode._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(400).json({ message: "User are not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};


export const checkrole = async (req, res, next) => {
    try {
    const checkrole = await Auth.findById(req.user._id);

    if(checkrole.role !== "seller"){
        return res.status(400).json({message: "You are not authorized to access this page"})
    }
      next();
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

