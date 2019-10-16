'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _contactsController = require('./contacts-controller');

var controller = _interopRequireWildcard(_contactsController);

var _authService = require('../../services/auth-service');

var auth = _interopRequireWildcard(_authService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.post('/contact', auth.requireLogin, controller.create);
router.get('/contact', auth.requireLogin, controller.index);
router.get('/contact/:id', auth.requireLogin, controller.show);
router.put('/contact', auth.requireLogin, controller.update);
router.delete('/contact/:id', auth.requireLogin, controller.remove);

exports.default = router;