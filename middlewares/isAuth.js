const jwt = require("jsonwebtoken");

// define the function to verify the token of the user to check if the user is loggeed in
const isAuthenticated = (req, res, next) => {
    try {
        // get the authorization header
        const authHeader = req.headers.authorization;

        // checck if the authHeader is valid
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            // throw an error in cases of no token
            throw new Error("No token provided");
        }
        // get the token from the authHeader
        const token = authHeader.split(" ")[1];
        // verify the token making use of jsonwebtoken
        const decoded = jwt.verify(token, "OjayKey");

        // set the req.user to the decoded
        req.user = {
            id: decoded.id,
            role: decoded.role
        };
        // call next with out anything
        next();
    } catch (err) {
        // define the error 
        err.message = "Token has expired or is invalid. Please login again.";
        // pass the error to the next middleware using the below
        next(err);
    }
};

module.exports = isAuthenticated;
