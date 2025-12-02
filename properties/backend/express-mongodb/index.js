const express = require('express');
const mongodb = require('mongodb');
const dbconnection = require('./database/database.js')

// Make executable function
const server = express();

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.get('/', (request, response) => {
    response.send('server is working fine');

})
// get method
server.get('/add-color', async (request, response) => {
    const db = await dbconnection();

    db.collection('colors').insertOne({
        name: request.query.name,
        color_code: request.query.code
    }).then((result) => {
        const output = {
            _status: true,
            _massage: 'Recorde Inserted',
            _data: result
        }
        response.send(output);

    }).catch(() => {
        const output = {
            _status: false,
            _massage: 'somthing went wrong',
            _data: null
        }
    })

})
server.get('/view-color', async (request, response) => {
    const db = await dbconnection();

    if (request.query.name) {
        var filter = { name: request.query.name }
    } else {
        var filter = {}
    }

    db.collection('colors').find(filter).toArray()
        .then((result) => {
            if (result.length > 0) {
                const output = {
                    _status: true,
                    _massage: 'Recorde found',
                    _data: result
                }
                response.send(output);
            } else {
                const output = {
                    _status: false,
                    _massage: 'Recorde not found',
                    _data: result
                }
                response.send(output);
            }


        }).catch(() => {
            const output = {
                _status: false,
                _massage: 'somthing went wrong',
                _data: null
            }
        })

})

// post methos
server.post('/add-color', async (request, response) => {
    const db = await dbconnection();

    db.collection('colors').insertOne({
        name: request.body.name,
        color_code: request.body.code
    }).then((result) => {
        const output = {
            _status: true,
            _massage: 'Recorde Inserted',
            _data: result
        }
        response.send(output);

    }).catch(() => {
        const output = {
            _status: false,
            _massage: 'somthing went wrong',
            _data: null
        }
    })

})
server.post('/view-color', async (request, response) => {
    const db = await dbconnection();

    if (request.body.name) {
        var filter = { name: request.body.name }
    } else {
        var filter = {}
    }

    db.collection('colors').find(filter).toArray()
        .then((result) => {
            if (result.length > 0) {
                const output = {
                    _status: true,
                    _massage: 'Recorde found',
                    _data: result
                }
                response.send(output);
            } else {
                const output = {
                    _status: false,
                    _massage: 'Recorde not found',
                    _data: result
                }
                response.send(output);
            }


        }).catch(() => {
            const output = {
                _status: false,
                _massage: 'somthing went wrong',
                _data: null
            }
        })

})

// update 

// server.put('/update-color', async (request, response) => {
server.put('/update-color/:id', async (request, response) => {
    const db = await dbconnection();

    db.collection('colors').updateOne({

        // _id: new mongodb.ObjectId(request.body.id)
        _id: new mongodb.ObjectId(request.params.id)
    },
        {
            $set: {
                name: request.body.name,
                color_code: request.body.code
            }



        })
        .then((result) => {
            const output = {
                _status: true,
                _massage: 'Recorde Updated',
                _data: result
            }
            response.send(output);

        }).catch(() => {
            const output = {
                _status: false,
                _massage: 'somthing went wrong',
                _data: null
            }
        })

})

// delete
server.post('/delete-color', async (request, response) => {
    const db = await dbconnection();

    db.collection('colors').deleteOne({
        _id: new mongodb.ObjectId(request.body.id)
    })
        .then((result) => {
            
                const output = {
                    _status: true,
                    _massage: 'Recorde Delete',
                    _data: result
                }
                response.send(output);
        


        }).catch(() => {
            const output = {
                _status: false,
                _massage: 'somthing went wrong',
                _data: null
            }
        })

})

server.listen(7001, () => {
    console.log('server is Working fine')
})