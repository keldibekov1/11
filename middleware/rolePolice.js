function passedRole(allowedRoles) {
  return (req, res, next) => {
    let { role } = req.user;

    if (!allowedRoles.includes(role)) {
      return res.status(403).send({ message: "Not allowed" });
    }

    next(); 
  };
}

export default passedRole;
