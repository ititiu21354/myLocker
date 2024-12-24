const express = require ('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authenticateToken = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorizeMiddleware");

router.post('/', authenticateToken, authorize('admin', 'Pharmacist'), customerController.createCustomer); // Create a new customer
router.delete('/:id', authenticateToken, authorize('admin', 'Pharmacist'), customerController.deleteCustomer); // Delete a customer
router.put('/:id', authenticateToken, authorize('admin', 'Pharmacist'),  customerController.updateCustomer); // Update a customer
router.get('/:id', authenticateToken, authorize('admin', 'Pharmacist'),  customerController.getCustomerById); // Get customer by ID
router.get('/phone/:phone', authenticateToken, authorize('admin', 'Pharmacist'),  customerController.getCustomerByPhone); // Get customer by phone
router.get('/', authenticateToken, authorize('admin', 'Pharmacist'), customerController.getAllCustomers); // Get all customers

module.exports = router;