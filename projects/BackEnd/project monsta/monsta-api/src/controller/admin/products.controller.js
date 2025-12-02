const products = require('../../models/products.js');
const category = require('../../models/category.js');
const subCategory = require('../../models/subCategory.js');
const subSubCategory = require('../../models/subSubCategory.js');
require('dotenv').config()
var slugify = require('slugify')

const generateUniqueSlug = async (Model, baseSlug) => {
    let slug = baseSlug;
    let count = 0;

    // Loop to find unique slug
    while (await Model.findOne({ slug })) {
        count++;
        slug = `${baseSlug}-${count}`;
    }

    return slug;
};


exports.create = async (request, response) => {
    var saveData = request.body;

    var slug = slugify(request.body.name, {
        remove: undefined,
        lower: true,
        strict: false,
        trim: true
    })
    saveData.slug = await generateUniqueSlug(products, slug);

    if (request.files) {
        saveData.image = request.files.image ? request.files.image[0].filename : ''
    }
    if (request.files && request.files.photos) {
        saveData.photos = request.files.photos.map(file => file.filename);
    }


    var data = new products(saveData);
    await data.save()
        .then(async (result) => {


            if (request.body.parent_category_ids && request.body.parent_category_ids.length > 0) {
                await category.updateMany(
                    {
                        _id: request.body.parent_category_ids
                    }, {
                    $push: {
                        products_ids: {
                            $each: [result._id]
                        }
                    }
                });
            }

            if (request.body.sub_category_ids && request.body.sub_category_ids.length > 0) {
                await subCategory.updateMany(
                    {
                        _id: request.body.sub_category_ids
                    }, {
                    $push: {
                        products_ids: {
                            $each: [result._id]
                        }
                    }
                });
            }
            if (request.body.sub_sub_category_ids && request.body.sub_sub_category_ids.length > 0) {
                await subSubCategory.updateMany(
                    {
                        _id: request.body.sub_sub_category_ids
                    }, {
                    $push: {
                        products_ids: {
                            $each: [result._id]
                        }
                    }
                });
            }

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

    if (request.body != undefined) {
        if (request.body.status != undefined) {
            if (request.body.status == true) {
                addCondition.push({ status: true })
            }
        }
    }
    if (request.body != undefined) {
        if (request.body.status != undefined) {
            if (request.body.status == false) {
                addCondition.push({ status: false })
            }
        }
    }


    const orCondition = [];


    if (request.body != undefined) {
        if (request.body.name != undefined) {
            if (request.body.name != '') {
                var name = new RegExp(request.body.name, "i")
                orCondition.push({ name: name })
            }
        }
        if (request.body.parent_category_ids && request.body.parent_category_ids.length > 0) {
            addCondition.push({
                parent_category_ids: { $in: request.body.parent_category_ids }
            });
        }
        if (request.body.material_ids && request.body.material_ids.length > 0) {
            addCondition.push({
                material_ids: { $in: request.body.material_ids }
            });
        }
        if (request.body.colors_ids && request.body.colors_ids.length > 0) {
            addCondition.push({
                colors_ids: { $in: request.body.colors_ids }
            });
        }

        if (request.body.sub_category_ids && request.body.sub_category_ids.length > 0) {
            addCondition.push({
                sub_category_ids: { $in: request.body.sub_category_ids }
            });
        }

        if (request.body.sub_sub_category_ids && request.body.sub_sub_category_ids.length > 0) {
            addCondition.push({
                sub_sub_category_ids: { $in: request.body.sub_sub_category_ids }
            });
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
    let sortOption = {};

    switch (request.body.sort) { // frontend se number bheja h
        case '1':
            sortOption = { is_feature: -1, _id: -1 };
            break;
        case '2':
            sortOption = { create_at: -1 };
            break;
        case '3':
            sortOption = { is_onsale: -1, _id: -1 };
            break;
        case '4':
            sortOption = { is_best_selling: -1, _id: -1 };
            break;
        case '5':
            sortOption = { sale_price: 1 };
            break;
        case '6':
            sortOption = { sale_price: -1 };
            break;
        case '7':
            sortOption = { name: 1 };
            break;
        case '8':
            sortOption = { name: -1 };
            break;
        default:
            sortOption = { _id: -1 }; // default
    }

    var totalrecords = await products.find(filter).countDocuments();

    await products.find(filter)
        .sort(sortOption)
        .populate([

            {
                path: 'parent_category_ids',
                select: 'name'
            },
            {
                path: 'sub_category_ids',
                select: 'name'
            },
            {
                path: 'sub_sub_category_ids',
                select: 'name'
            },
            {
                path: 'colors_ids',
                select: 'name'
            },
            {
                path: 'material_ids',
                select: 'name'
            },
        ])
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
                    _image_path: process.env.PRODUCTS_IMAGES,
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
    const { slug } = request.params;

    await products.findOne({ slug })
        .populate([
            {
                path: 'parent_category_ids',
                select: 'name'
            },
            {
                path: 'sub_category_ids',
                select: 'name'
            },
            {
                path: 'sub_sub_category_ids',
                select: 'name'
            },
            {
                path: 'colors_ids',
                select: 'name'
            },
            {
                path: 'material_ids',
                select: 'name'
            },
        ])
        .then((result) => {
            if (result) {
                const output = {
                    _status: true,
                    _message: 'Recorde Fatch !!',
                    _image_path: process.env.PRODUCTS_IMAGES,
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
exports.productDetails = async (request, response) => {


    await products.findById(request.params.id)

        .populate([
            {
                path: 'parent_category_ids',
                select: 'name'
            },
            {
                path: 'sub_category_ids',
                select: 'name'
            },
            {
                path: 'sub_sub_category_ids',
                select: 'name'
            },
            {
                path: 'colors_ids',
                select: 'name'
            },
            {
                path: 'material_ids',
                select: 'name'
            },
        ])


        .then((result) => {
            if (result) {


                const output = {
                    _status: true,
                    _message: 'Recorde Fatch !!',
                    _image_path: process.env.PRODUCTS_IMAGES,
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
    var saveData = request.body;

    var slug = slugify(request.body.name, {
        remove: undefined,
        lower: true,
        strict: false,
        trim: true
    })
    saveData.slug = await generateUniqueSlug(products, slug);

    // ✅ FIX: only set image if uploaded
    if (request.files && request.files.image) {
        saveData.image = request.files.image[0].filename;
    }

    // ✅ FIX: only set photos if uploaded
    if (request.files && request.files.photos) {
        saveData.photos = request.files.photos.map(file => file.filename);
    }

    await products.updateOne(
        { _id: request.params.id },
        { $set: saveData }
    )
        .then((result) => {
            const output = {
                _status: true,
                _message: 'Record Updated !!',
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
                _message: 'Something went wrong !!',
                _data: errormessage
            }
            response.send(output);
        })
}


exports.changestatuse = async (request, response) => {
    await products.updateMany({
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
    await products.updateMany({

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