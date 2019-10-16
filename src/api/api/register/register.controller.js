import { StringUtil } from '../../utilities/string-util';
import User from '../../model/user-model';

// User Register
export function index(req, res) {
    const validation = validateIndex(req.body);
    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    user.save(error => {
        if (error) {
            // Mongoose Error Code 11000 means validation failure (email taken)
            if (error.code === 11000) {
                return res.status(403).json({ message: 'Eamil is already taken' });
            }
            return res.status(500).json();
        }
        return res.status(201).json();
    });
}

function validateIndex(body) {
    let errors = '';
    if (StringUtil.isEmpty(body.email)) {
        errors += 'Email is required. ';
    }
    if (StringUtil.isEmpty(body.password)) {
        errors += 'Password is required. ';
    }
    if (StringUtil.isEmpty(body.firstName)) {
        errors += 'First name is required. ';
    }
    if (StringUtil.isEmpty(body.lastName)) {
        errors += 'Last name is required. ';
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}