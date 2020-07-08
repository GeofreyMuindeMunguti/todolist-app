var express = require('express');
var controller = require('./users.controller');
var router = express.Router();
// authenticate routes that require users to be loggedin
var authenticate = require('../../middleware/authenticate');
//authenticate routes that do not require users to be loggedin which you dont want to be publicly accessible.
var preauthenticate = require('../../middleware/preauthenticate');

router.get('/', authenticate, controller.getAll);
router.get('/:id', authenticate,  controller.getOne);
router.post('/invite', authenticate,  controller.invite);
router.post('/login', preauthenticate,  controller.login);
router.post('/', preauthenticate, controller.create);
router.put('/:id', authenticate, controller.update);
router.delete('/:id', authenticate, controller.delete);
router.delete('/', preauthenticate, controller.deleteAll);
router.post('/token', preauthenticate, controller.passwordResetToken);
router.post('/resetpass', preauthenticate, controller.passwordReset);
 

module.exports = router;
