const category = require('../../models/category.js');
require('dotenv').config()
// console.log(process.env)


exports.create = async (request, response) => {

    // console.log(request.file)
    //single image to console name and path
    // console.log(request.files)  //single image to console name and path
    var saveImgData = request.body;
    if (request.file) {
        saveImgData.image = request.file.filename
    }


    var data = new category(saveImgData);
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
    var limit = 15;
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

    if (request.body.status == true) {
        addCondition.push({ status: true })
    }
    if (request.body.status == false) {
        addCondition.push({ status: false })
    }

    //    if (request.body && request.body.status === true) {
    //     addCondition.push({ status: true });
    // } else if (request.body && request.body.status === false) {
    //     addCondition.push({ status: false });
    // }


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

    var totalrecords = await category.find(filter).countDocuments();

    await category.find(filter).sort({

        order: 'asc'
    })
        .select('_id name order image status')
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
                    _image_path: process.env.category_images,
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

    await category.findById(request.params.id)
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

    var saveImgData = request.body;
    if (request.file) {
        saveImgData.image = request.file.filename
    }

    await category.updateOne({
        _id: request.params.id
    }, {
        $set: saveImgData
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
    await category.updateMany({
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
    await category.updateMany({

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