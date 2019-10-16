'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = index;

var _stringUtil = require('../../utilities/string-util');

var _userModel = require('../../model/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// User Register
function index(req, res) {
    var validation = validateIndex(req.body);
    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
    }

    var user = new _userModel2.default({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    user.save(function (error) {
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
    var errors = '';
    if (_stringUtil.StringUtil.isEmpty(body.email)) {
        errors += 'Email is required. ';
    }
    if (_stringUtil.StringUtil.isEmpty(body.password)) {
        errors += 'Password is required. ';
    }
    if (_stringUtil.StringUtil.isEmpty(body.firstName)) {
        errors += 'First name is required. ';
    }
    if (_stringUtil.StringUtil.isEmpty(body.lastName)) {
        errors += 'Last name is required. ';
    }

    return {
        isValid: _stringUtil.StringUtil.isEmpty(errors),
        message: errors
    };
}