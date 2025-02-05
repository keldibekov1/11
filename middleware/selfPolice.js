function selfPolice(allowedRoles) {
  return (req, res, next) => {
    let { id } = req.params;
    let { role } = req.user;

    if (id == req.user.id || allowedRoles.includes(role)) {
      return next(); 
    }

    res.status(403).send({ message: "Not allowed to update profile" });
  };
}

export default selfPolice;
