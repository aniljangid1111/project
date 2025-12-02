const express = require('express');
const { create, view, details, update, changestatuse, destroy } = require('../../controller/admin/material.controller.js');

const router = express.Router();

module.exports = server => {
    router.post('/create', create)

    router.post('/view', view)

    router.post('/details/:id', details)

    router.put('/update/:id', update)

    router.put('/change-status', changestatuse)
    
    router.put('/delete', destroy)
    



    server.use('/api/admin/material', router)
}

