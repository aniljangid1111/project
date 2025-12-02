var apikey = 123456789;

exports.validation = ((request, response, next) => {
    if (!request.query.apikey) {
        const output = {
            _status: false,
            _message: 'Please Insert ApiKey!',
            _data: null,
        }

        response.send(output)
    } else if (request.query.apikey != apikey) {
        const output = {
            _status: false,
            _message: 'Invalid  ApiKey!',
            _data: null,
        }
        response.send(output)
    }else {
        next();
    }
})