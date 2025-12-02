const express = require('express');
const { admincontroller, loginAdmin } = require('../../controller/controller');

const adminRoutes = express.Router();

adminRoutes.get('/test-api', admincontroller)

adminRoutes.post('/login', loginAdmin)

module.exports = adminRoutes