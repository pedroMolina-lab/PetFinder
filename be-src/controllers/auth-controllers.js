"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.logInUser = exports.createAuth = void 0;
const auth_1 = require("../models/auth");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const models_1 = require("../models");
const SECRET = "fojesdjfop";
function calculateSHA256Hash(original) {
    const sha256Hash = crypto.createHash("sha256");
    sha256Hash.update(original);
    return sha256Hash.digest("hex");
}
async function createAuth(userData) {
    try {
        const { email, name, lastname, password } = userData;
        const hashedPassword = calculateSHA256Hash(password);
        const [auth, created] = await auth_1.Auth.findOrCreate({
            where: { email },
            defaults: {
                email,
                name,
                lastname,
                password: hashedPassword,
            },
        });
        const [user, createdUser] = await models_1.User.findOrCreate({
            where: { email },
            defaults: {
                email,
                user_id: auth.get("id")
            },
        });
        return [created, auth, user];
    }
    catch (error) {
        throw error;
    }
}
exports.createAuth = createAuth;
async function logInUser(data) {
    try {
        const { email, password } = data;
        const hashedPassword = calculateSHA256Hash(password);
        const user = await auth_1.Auth.findOne({
            where: { email, password: hashedPassword },
        });
        return user;
    }
    catch (error) {
        throw error;
    }
}
exports.logInUser = logInUser;
function authMiddleware(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodedToken = jwt.verify(token, SECRET);
        console.log(decodedToken);
        req._user = decodedToken;
        next();
    }
    catch (e) {
        res.status(401).json({ error: true });
    }
}
exports.authMiddleware = authMiddleware;
