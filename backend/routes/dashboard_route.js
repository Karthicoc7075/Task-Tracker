const express = require('express');
const {DashboardDatas } = require('../controllers/dashboard_controller');
const  auth  = require('../middleware/auth');
const dashboardRouter = express.Router();


dashboardRouter.get('/',auth(), DashboardDatas);


module.exports = dashboardRouter;