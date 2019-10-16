'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = index;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.show = show;

var _userModel = require('../../model/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

var _contactModel = require('../../model/contact-model');

var _contactModel2 = _interopRequireDefault(_contactModel);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _authService = require('../../services/auth-service');

var auth = _interopRequireWildcard(_authService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
    // FIND ALL CONTACTS
    var id = auth.getUserId(req);
    _userModel2.default.findOne({ _id: id }, function (error, user) {
        if (error && !user) {
            return res.status(500).json();
        }

        _contactModel2.default.find({ author: user }, function (error, contacts) {
            if (error) {
                return res.status(500).json();
            }
            return res.status(200).json({ contacts: contacts });
        }).populate('author', 'email fistName lastName', 'user');
        // Populate will find the author that created the contact and add it to the contact (email only)
    });
}

function create(req, res) {
    var id = auth.getUserId(req);
    _userModel2.default.findOne({ _id: id }, function (error, user) {
        if (error && !user) {
            return res.status(500).json();
        }
        var contact = new _contactModel2.default(req.body.contact);
        contact.author = user._id;

        contact.save(function (error) {
            if (error) {
                return res.status(500).json();
            }
            return res.status(201).json();
        });
    });
}

function update(req, res) {
    var id = auth.getUserId(req);

    _userModel2.default.findOne({ _id: id }, function (error, user) {
        if (error) {
            return res.status(500).json();
        }
        if (!user) {
            return res.status(404).json();
        }

        var contact = new _contactModel2.default(req.body.contact);
        contact.author = user._id;
        _contactModel2.default.findByIdAndUpdate({ _id: contact._id }, contact, function (error) {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
}

function remove(req, res) {
    var id = auth.getUserId(req);
    _contactModel2.default.findOne({ _id: req.params.id }, function (error, contact) {
        if (error) {
            return res.status(500).json();
        }
        if (!contact) {
            return res.status(404).json();
        }
        if (contact.author._id.toString() !== id) {
            return res.status(403).json({ message: 'Not allowed to delete another user\'s contact' });
        }
        _contactModel2.default.deleteOne({ _id: req.params.id }, function (error) {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
}

function show(req, res) {
    // GET contact BY ID
    _contactModel2.default.findOne({ _id: req.params.id }, function (error, contact) {
        if (error) {
            return res.status(500).json();
        }
        if (!contact) {
            return res.status(404).json();
        }
        return res.status(200).json({ contact: contact });
    });
}