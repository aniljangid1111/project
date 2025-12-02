const order = require('../../models/order.js')
require('dotenv').config()
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const saltRounds = 10;


// View Profile
exports.orderplaced = async (request, response) => {
    var token = request.headers.authorization.split(' ')[1];
    var verify = jwt.verify(token, process.env.API_TOKEN_KEY, async (error, value) => {
        if (error) {
            const output = {
                _status: false,
                _message: 'Token Verification failed',
                _data: null
            };
            return response.send(output);
        } else {
            await user.findById(value.data._id)
                .then((result) => {
                    if (result) {
                        const output = {
                            _status: true,
                            _message: "Record Fetch !!",
                            _image_path: process.env.user_image_url,
                            _data: result
                        }
                        response.send(output);
                    } else {
                        const output = {
                            _status: false,
                            _message: 'No Record Found !!',
                            _data: result
                        };
                        return response.send(output);
                    }
                })
                .catch((error) => {
                    const output = {
                        _status: false,
                        _message: 'Something Went Wrong !!',
                        _data: error
                    }

                    response.send(output);
                })
        }
    })
}



