const Employee = require('../models/Employee');
const User = require('../models/User');
// CREATE
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
const getEmployeeById = async (req, res) => {

  try {

    const employee =
      await Employee.findById(req.params.id);

    if (!employee) {

      return res.status(404).json({
        message: 'Employee not found'
      });

    }

    res.json(employee);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

};

// UPDATE
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// controllers

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

const updateProfile = async (req, res) => {
  const { username, email, password } = req.body;

  let user = await User.findById(req.user.id);

  if (username) user.username = username;
  if (email) user.email = email;

  if (password) {
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  await user.save();

  res.json({ msg: "Profile updated successfully" });
};

const getStats = async (req, res) => {
 try{

  const total = await Employee.countDocuments();
  const active = await Employee.countDocuments({ status: 'Active' });
  const inactive = await Employee.countDocuments({ status: 'Inactive' });

  res.json({ total, active, inactive });
} catch (error) {

    res.status(500).json({
      message: 'Server Error'
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getProfile,
  updateProfile,
  getStats
};