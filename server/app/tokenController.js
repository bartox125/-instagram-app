import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken;

const createToken = (user) => {
    let obj={
        email: user.email,
    }
  let token = sign(
    obj,
    "verysecretkey",
    {
      expiresIn: "1h",
    }
  );
  return token
};
const verifyToken = (token) => {
  try {
    let decoded = verify(token, "verysecretkey");
    return(decoded);
  } catch (ex) {
    return({ message: ex.message });
  }
};
export {createToken, verifyToken}
