const express = require('express');
const { create, view, details, update, changestatuse, destroy } = require('../../controller/admin/color.controller');
const router = express.Router();

module.exports = server => {
    router.post('/create', create)

    router.post('/view', view)

    router.post('/details', details)

    router.post('/update', update)

    router.post('/change-statuse', changestatuse)
    
    router.post('/delete', destroy)
    



    server.use('/api/admin/color', router)
}

