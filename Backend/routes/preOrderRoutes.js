const express = require('express');
const router = express.Router();
const preOrderController = require('../controllers/preOrderController');

router.post('/', preOrderController.createPreOrder);
router.get('/', preOrderController.getPreOrders);
router.get('/:pre_order_id', preOrderController.getPreOrder);
router.put('/:pre_order_id/cancel', preOrderController.cancelPreOrder);
router.put('/:pre_order_id/status', preOrderController.updatePreOrderStatus);

module.exports = router;