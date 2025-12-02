const subCategory = require('../../models/subCategory.js');
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

    var data = new subCategory(saveImgData);
    await data.save()
        .then(async (result) => {
            await category.updateMany(
                {
                    _id: request.body.parent_category_ids

                },
                {
                    $push:
                    {
                        sub_category_ids:
                        {
                            $each: [result._id]
                        }
                    }
                });


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
    const orCondition = [];

    if (request.body != undefined) {
        if (request.body.name != undefined) {
            if (request.body.name != '') {
                var name = new RegExp(request.body.name, "i")
                orCondition.push({ name: name })
            }
        }
        if (request.body.parent_category_id != undefined) {
            if (request.body.parent_category_id != '') {
                addCondition.push({ parent_category_id: request.body.parent_category_id })
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

    var totalrecords = await subCategory.find(filter).countDocuments();

    await subCategory.find(filter)

        .select('_id name order parent_category_id parent_category_ids image status')
        // .populate('parent_category_id')
        // .populate('parent_category_ids')
        // .populate('parent_category_id', 'name image')
        // .populate('parent_category_ids', 'name image')
        .populate([
            {
                path: 'parent_category_id',
                select: 'name image'
            },
            {
                path: 'parent_category_ids',
                select: 'name image'
            }
        ])

        .sort({
            order: 'asc'
        })
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
                    _image_path: process.env.SUB_CATEGORY_IMAGES,
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

    await subCategory.findById(request.params.id)
        .then((result) => {
            if (result) {
                const output = {
                    _status: true,
                    _message: 'Recorde Fatch !!',
                    _image_path: process.env.SUB_CATEGORY_IMAGES,
                    _data: result,
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

     var saveData = request.body;
    if (request.file) {
        saveData.image = request.file.filename
    }

    await subCategory.updateOne({
        _id: request.params.id
    }, {
        $set: saveData
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
    await subCategory.updateMany({
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
    await subCategory.updateMany({

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