const express = require('express');
const { adminPanelRoutes, websiteRoutes } = require('./routes/routes');

const allRoutes = express.Router();

allRoutes.use('/admin-panel', adminPanelRoutes)
allRoutes.use('/website', websiteRoutes)


module.exports = allRoutes 