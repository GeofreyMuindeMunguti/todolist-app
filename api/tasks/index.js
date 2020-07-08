var express = require('express');
var controller = require('./tasks.controller');
var router = express.Router();
// authenticate routes that require users to be loggedin
var authenticate = require('../../middleware/authenticate');
//authenticate routes that do not require users to be loggedin which you dont want to be publicly accessible.
var preauthenticate = require('../../middleware/preauthenticate');

router.get('/', authenticate, controller.getAll);
router.get('/:id', authenticate, controller.getOne);
router.post('/', authenticate, controller.create);
router.put('/:id', authenticate, controller.update);
router.delete('/:id', authenticate, controller.delete);
router.delete('/', authenticate, controller.deleteAll);
router.get('/user/:id', authenticate, controller.getByUser);


module.exports = router;