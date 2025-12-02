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
                _statue: true,
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
                _statue: false,
                _message: 'Somthing went wrong !!',
                _data: errormessage
            }
            response.send(output);

        })

}
exports.view = async (request, response) => {
    await color.find()
        .then((result) => {
            if (result.length > 0) {
                const output = {
                    _statue: true,
                    _message: 'Recorde Fatch !!',
                    _data: result
                }
                response.send(output);
            } else {
                const output = {
                    _statue: false,
                    _message: 'No Recorde Found !!',
                    _data: result
                }
                response.send(output);
            }

        })
        .catch((error) => {

            const output = {
                _statue: false,
                _message: 'Somthing went wrong !!',
                _data: error
            }
            response.send(output);

        })

}

exports.details = async (request, response) => {

}

exports.update = async (request, response) => {

}

exports.changestatuse = async (request, response) => {

}

exports.destroy = async (request, response) => {

}