/**
 * Used to perform all authentication-related operations
 * For example, generating a token, getting the email, etc.
 */

import jwt from 'jsonwebtoken';

export function generateJWT(user) {
    const tokenData = { email: user.email, id: user._id, firstName: user.firstName, lastName: user.firstName };
    return jwt.sign({ user: tokenData }, process.env.TOKEN_SECRET);
}

export function requireLogin(req, res, next) {
    const token = decodeToken(req);
    if (!token) {
        return res.status(401).json({ message: 'You must be logged in.' });
    }
    next();
}

/**
 * Will verify that the token came from this application (using secret). Then,
 * will decode it and grab the signed data (email, etc.) and return decoded token
 * @param {HTTP Request} req 
 */
export function decodeToken(req) {
    const token = req.headers.authorization || req.headers['authorization'];

    if (!token) {
        return null;
    }

    try {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        return null;
    }
}

export function getEmail(req) {
    const token = decodeToken(req);
    if (!token) {
        return null;
    }
    return token.user.email;
}
export function getFirstName(req) {
    const token = decodeToken(req);
    if (!token) {
        return null;
    }
    return token.user.firstName;
}
export function getLastName(req) {
    const token = decodeToken(req);
    if (!token) {
        return null;
    }
    return token.user.lastName;
}

export function getUserId(req) {
    const token = decodeToken(req);
    if (!token) {
        return null;
    }
    return token.user.id;
}