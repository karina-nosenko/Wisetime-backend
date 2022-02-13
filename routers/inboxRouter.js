const { Router } = require('express');
const { inboxController } = require('../controllers/inboxController');

const inboxRouter = new Router();

inboxRouter.post('/', inboxController.addInboxtask); 
inboxRouter.get('/', inboxController.gettasks);
inboxRouter.delete('/:taskId', inboxController.deleteTask);
module.exports = { inboxRouter };