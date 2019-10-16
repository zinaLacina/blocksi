'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _stringUtil = require('../utilities/string-util');

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose2.default.Schema({
    email: String,
    firstName: String,
    lastName: String,
    phone: String,
    password: String
});
userSchema.set('timestamps', true);

// Returns a transient field client-side without actually adding it to the schema
userSchema.virtual('fullName').get(function () {
    var firstName = _stringUtil.StringUtil.capitalize(this.firstName.toLowerCase());
    var lastName = _stringUtil.StringUtil.capitalize(this.lastName.toLowerCase());
    return firstName + ' ' + lastName;
});

// Static methods that can be called from anywhere (e.g., User.passwordMatches)
userSchema.statics.passwordMatches = function (password, hash) {
    return _bcryptNodejs2.default.compareSync(password, hash);
};
// Runs validation before saving a user
userSchema.pre('save', function (next) {
    this.email = this.email.toLowerCase();
    this.firstName = this.firstName.toLowerCase();
    this.lastName = this.lastName.toLowerCase();
    var unsafePassword = this.password;
    this.password = _bcryptNodejs2.default.hashSync(unsafePassword); // Will encrypt the user's password
    next();
});

exports.default = _mongoose2.default.model('user', userSchema);