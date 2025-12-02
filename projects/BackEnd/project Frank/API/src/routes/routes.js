const express = require('express');
const adminRoutes = require('./Admin-panel/adminPanel.routes');

const adminPanelRoutes = express.Router();
const websiteRoutes = express.Router();

adminPanelRoutes.use('/admin', adminRoutes)

module.exports = {
    adminPanelRoutes,
    websiteRoutes
}