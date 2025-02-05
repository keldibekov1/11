async function verifyToken(req, res, next) {
  let header = req.header("Authorization")?.split(" "); 

  if (!header || header.length !== 2) {
    return res.status(403).send({ message: "Not found token" });
  }

  let [_, token] = header;

  try {
    let result = jwt.verify(token, "secretKey");
    req.user = result; 
    next(); 
  } catch (error) {
    return res.status(401).send({ message: "Invalid token" });
  }
}

export default verifyToken;
