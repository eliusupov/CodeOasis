const express = require('express');

const router = express.Router();
const order = require('../controllers/Order');
const auth = require('../middleware/auth');

router.get('/', auth, order.orderGetAll);
router.put('/create', auth, order.orderAddNew);

module.exports = router;
