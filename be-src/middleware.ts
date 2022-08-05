import * as jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, process.env.SECRET);
    req._user = data;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: true });
  }
};
