const express = require('express');
const supplierController = require('../controllers/supplierController');
const authenticateToken = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');
const router = express.Router();
//supplierRoutes.js
// Define routes
router.get('/', authenticateToken, authorize('admin'), supplierController.getAllSuppliers);
router.get('/:id', authenticateToken, authorize('admin' ), supplierController.getSupplierById);
router.post('/', authenticateToken, authorize('admin' ), supplierController.createSupplier);
router.put('/:id', authenticateToken, authorize('admin' ), supplierController.updateSupplier);
router.delete('/:id', authenticateToken, authorize('admin' ), supplierController.deleteSupplier);

module.exports = router;
