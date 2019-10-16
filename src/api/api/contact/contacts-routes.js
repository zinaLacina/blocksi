import express from 'express';
const router = express.Router();
import * as controller from './contacts-controller';
import * as auth from '../../services/auth-service';

router.post('/contact', auth.requireLogin, controller.create);
router.get('/contact', auth.requireLogin, controller.index);
router.get('/contact/:id', auth.requireLogin, controller.show);
router.put('/contact', auth.requireLogin, controller.update);
router.delete('/contact/:id', auth.requireLogin, controller.remove);

export default router;