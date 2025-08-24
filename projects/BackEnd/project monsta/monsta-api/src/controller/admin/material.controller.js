const material = require('../../models/material.js');

exports.create = async (request, response) => {

    var data = new material(request.body);
    await data.save()
        .then((result) => {
            const output = {
                _status: true,
                _message: 'Recorde Inseted !!',
                _data: result
            }
            response.send(output);
        })
        .catch((error) => {
            var errormessage = [];

            for (index in error.errors) {
                errormessage.push(error.errors[index].message);
            }

            const output = {
                 _status: false,
                _message: 'Somthing went wrong !!',
                _data: errormessage
            }
            response.send(output);

        })

}
exports.view = async (request, response) => {
    var limit = 5;
    var page = 1;
    var skip = 0

    if (request.body != undefined) {
        var limit = request.body.limit ? request.body.limit : limit;
        var page = request.body.page ? request.body.page : page;
        var skip = (page - 1) * limit;
    }

    const addCondition = [
        {
            delete_at: null,
        }
    ];

    const orCondition = [];


    if (request.body != undefined) {
        if (request.body.name != undefined) {
            if (request.body.name != '') {
                var name = new RegExp(request.body.name, "i")
                orCondition.push({ name: name })
            }
        }
    }

    if (addCondition.length > 0) {
        var filter = { $and: addCondition }
    } else {
        var filter = {}

    }

    if (orCondition.length > 0) {
        filter.$or = orCondition;
    }


    var totalrecords = await material.find(filter).countDocuments();

    await material.find(filter).sort({
        order: 'asc'
    })
        .select('_id name order  status')
        .sort({
            _id: 'desc'
        })
        .limit(limit).skip(skip)
        .then((result) => {
            if (result.length > 0) {
                const output = {
                    _status: true,
                    _message: 'Recorde Fatch !!',
                    _paggination: {
                        total_records: totalrecords,
                        current_page: page,
                        total_page: Math.ceil(totalrecords / limit)
                    },
                    _data: result
                }
                response.send(output);
            } else {
                const output = {
                    _status: false,
                    _message: 'No Recorde Found !!',
                    _data: result
                }
                response.send(output);
            }

        })
        .catch((error) => {

            const output = {
                _status: false,
                _message: 'Somthing went wrong !!',
                _data: error
            }
            response.send(output);

        })

}

exports.details = async (request, response) => {

    await material.findById(request.params.id)
        .then((result) => {
            if (result) {
                const output = {
                    _status: true,
                    _message: 'Recorde Fatch !!',
                    _data: result
                }
                response.send(output);
            } else {
                const output = {
                    _status: false,
                    _message: 'No Recorde Found !!',
                    _data: result
                }
                response.send(output);
            }

        })
        .catch((error) => {

            const output = {
                _status: false,
                _message: 'Somthing went wrong !!',
                _data: error
            }
            response.send(output);

        })
}

exports.update = async (request, response) => {

    await material.updateOne({
        _id: request.params.id
    }, {
        $set: request.body
    })
        .then((result) => {
            const output = {
                _status: true,
                _message: 'Recorde Update !!',
                _data: result
            }
            response.send(output);
        })
        .catch((error) => {
            var errormessage = [];

            for (index in error.errors) {
                errormessage.push(error.errors[index].message);
            }

            const output = {
                _status: false,
                _message: 'Somthing went wrong !!',
                _data: errormessage
            }
            response.send(output);

        })
}

exports.changestatuse = async (request, response) => {
    await material.updateMany({
        _id: request.body.id
    }, [{
        $set: {
            status: {
                $not: "$status"
            }
        }
    }])
        .then((result) => {
            const output = {
                _status: true,
                _message: 'Change Status successfully !!',
                _data: result
            }

            response.send(output);
        })
        .catch((error) => {

            var errorMessages = [];

            for (index in error.errors) {
                errorMessages.push(error.errors[index].message);
            }

            const output = {
                _status: false,
                _message: 'Something Went Wrong !!',
                _data: errorMessages
            }

            response.send(output);
        });
}

exports.destroy = async (request, response) => {
    await material.updateMany({

        _id: request.body.id

    }, {
        $set: {
            delete_at: Date.now()
        }
    })
        .then((result) => {
            const output = {
                _status: true,
                _message: 'Recorde Delete !!',
                _data: result
            }
            response.send(output);
        })
        .catch((error) => {
            var errormessage = [];

            for (index in error.errors) {
                errormessage.push(error.errors[index].message);
            }

            const output = {
                _status: false,
                _message: 'Somthing went wrong !!',
                _data: errormessage
            }
            response.send(output);

        })
}