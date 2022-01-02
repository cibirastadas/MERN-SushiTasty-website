import "dotenv/config";

export const authAdminRole = async (req, res, next) => {
  const { role } = req.user;
  if (role === "Admin") {
    next();
    return;
  }
  return res.sendStatus(401);
};

export const authNormalRole = async (req, res, next) => {
  const { role } = req.user;
  if (role === "Normal") {
    next();
    return;
  }
  return res.sendStatus(401);
};

export const authAdminAndNormalRole = async (req, res, next) => {
  const { role } = req.user;
  if (["Admin", "Normal"].includes(role)) {
    next();
    return;
  }
  return res.sendStatus(401);
};

export const authWorkerAndAdminRole = async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Normal") {
    next();
    return;
  }
  return res.sendStatus(401);
};
