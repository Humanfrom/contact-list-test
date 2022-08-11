const Router = require('express');
const router = new Router();
const tableController = require('../controller/table_controller')

router.post('/row', tableController.createRow)
router.post('/login', tableController.login)
router.get('/table', tableController.getTable)
router.get('/row/:id', tableController.getRow)
router.put('/row', tableController.updateRow)
router.delete('/row/:id', tableController.deleteRow)

module.exports = router;
