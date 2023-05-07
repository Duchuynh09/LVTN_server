import jwt from "jsonwebtoken";

const checkUserToken = (req, res, next) => {
  try {
    const accessRole = ["sinhVien", "giangVien", "admin"];
    const reqToken = req.headers.authorization.split(" ")[1];
    // console.log(reqToken);

    if (!reqToken) res.status(401);
    jwt.verify(reqToken, process.env.SECRET_KEY, (err, data) => {
      if (err) return res.json({ state: "failure" });
      if (accessRole.includes(data.role)) {
        // console.log(data.role);
        next();
      } else {
        return res.status(402).json({ state: "failure" });
      }
    });
  } catch (error) {
    return res.status(500).json({ state: "failure" });
  }
};

const checkLecturerToken = (req, res, next) => {
  try {
    const accessRole = ["giangVien", "admin"];
    const reqToken = req.headers.authorization.split(" ")[1];
    if (!reqToken) res.status(401);
    jwt.verify(reqToken, process.env.SECRET_KEY, (err, data) => {
      if (err) return res.json({ state: "failure" });
      if (accessRole.includes(data.role)) {
        // console.log(data.role);
        next();
      } else {
        return res.json({ state: "failure" });
      }
    });
  } catch (error) {
    return res.json({ state: "failure" });
  }
};

const checkAdminToken = (req, res, next) => {
  try {
    const accessRole = ["admin"];
    const reqToken = req.headers.authorization?.split(" ")[1];
    // console.log(reqToken);
    if (!reqToken) res.status(401);
    jwt.verify(reqToken, process.env.SECRET_KEY, (err, data) => {
      if (err) return res.status(401).json({ state: "failure",err });
      if (accessRole.includes(data.role)) {
        next();
      } else {
        return res.status(402).json({ state: "failure" });
      }
    });
  } catch (error) {
    return res.status(500).json({ state: "failure" });
  }
};

export { checkUserToken, checkLecturerToken, checkAdminToken };
