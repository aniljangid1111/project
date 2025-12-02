const color = require('../../models/color.js');

exports.create = async (request, response) => {

    // var data = {
    //     name: request.body.color_name,
    //     code: request.body.color_code
    // }
    // var data = new color(data);
    var data = new color(request.body);
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
    var limit = 10;
    var page = 1;
    var skip = 0;

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


    // if (request.body != undefined) {
    //     if (request.body.name) {
    //         condition.name = request.body.name;
    //     }
    // }

    // console.log(condition);  



    var totalrecords = await color.find(filter).countDocuments();

    await color.find(filter).sort({
        // order: 'ascending'
        order: 'asc'
    })
        .select('_id name order code status')
        .sort({
            _id: 'desc'
            // _id: 'descending'
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
    // await color.findOne({
    //     _id: request.params.id
    // })

    await color.findById(request.params.id)
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

    // var checkcolor = await color.findOne({
    //     name : request.body.name 
    // })


    await color.updateOne({
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
    await color.updateMany({
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
    await color.updateMany({

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