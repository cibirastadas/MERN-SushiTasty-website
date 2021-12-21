import "dotenv/config";
const authRole = async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Admin") {
    return res.sendStatus(401);
  }
  next();
};

export default authRole;
