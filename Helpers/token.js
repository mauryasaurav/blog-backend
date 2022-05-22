var jwt = require("jsonwebtoken");

var createToken = (auth) => {
    return jwt.sign({
        id: auth.id
    }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

export const generateToken = async (req, res, next) => {
    req.token = createToken(req.auth);
    next();
};

export const sendToken = (req, res) => {
    res.setHeader('x-auth-token', req.token);
};
