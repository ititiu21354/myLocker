const express = require('express');
const locationController = require('../controllers/locationController');
const authenticateToken = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');
const router = express.Router();

// Define routes
router.get('/', authenticateToken, authorize('admin',), locationController.getAllLocations);
router.get('/:id', authenticateToken, authorize('admin'), locationController.getLocationById);
router.post('/', authenticateToken, authorize('admin'), locationController.createLocation);
router.put('/:id', authenticateToken, authorize('admin'), locationController.updateLocation);
router.delete('/:id', authenticateToken, authorize('admin'), locationController.deleteLocation);

module.exports = router;
