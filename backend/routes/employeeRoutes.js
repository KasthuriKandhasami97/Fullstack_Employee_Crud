const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getProfile,
  updateProfile,
  getStats
} = require('../controllers/employeeController');


// Employee CRUD
router.get('/stats/all', authMiddleware, getStats);

router.get('/me', authMiddleware, getProfile);

router.put('/update-profile', authMiddleware, updateProfile);

router.get('/', authMiddleware, getEmployees);

router.post('/', authMiddleware, createEmployee);

router.get('/:id', authMiddleware, getEmployeeById);

router.put('/:id', authMiddleware, updateEmployee);

router.delete('/:id', authMiddleware, deleteEmployee);

module.exports = router;