'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contactSchema = new _mongoose2.default.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    author: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'user' }
});
contactSchema.set('timestamps', true); // Adds create_at and updated_at timestamps

exports.default = _mongoose2.default.model('contact', contactSchema);