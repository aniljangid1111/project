const user = require('../../models/user.js')
require('dotenv').config()
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const saltRounds = 10;

// Register User API

exports.register = async (request, response) => {
    // check if user already exists
    const existingUser = await user.findOne({ email: request.body.email, delete_at: null, role_type: 'User' })

    if (existingUser) {
        const output = {
            _status: false,
            _message: 'User already exists with this email address.',
            _data: null
        };
        return response.send(output);
    }
    // ✅ Password validation
    if (!request.body.password || request.body.password.trim().length < 4) {
        return response.send({
            _status: false,
            _message: 'Password must be at least 4 characters long.',
            _data: null
        });
    }

    var password = await bcrypt.hash(request.body.password, saltRounds)

    var saveData = {
        name: request.body.name,
        email: request.body.email,
        password: password,
        mobile_number: request.body.mobile_number,
        role_type: 'User'
    }

    var data = new user(saveData);

    await data.save()
        .then((result) => {

            var token = jwt.sign(
                {
                    data: result
                },
                process.env.API_TOKEN_KEY);

            const output = {
                _status: true,
                _message: 'User Registerd !!',
                _token: token,
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

//  Login User
exports.login = async (request, response) => {

    const existingUser = await user.findOne({ email: request.body.email, delete_at: null, role_type: 'User' });
    if (existingUser) {
        if (!await bcrypt.compare(request.body.password, existingUser.password)) {
            const output = {
                _status: false,
                _message: 'Your Password is incorrect!',
                _data: null
            }
            return response.send(output);
        }
        if (existingUser.status == false) {
            const output = {
                _status: false,
                _message: 'Your account is inactive. Please contact support!',
                _data: null
            }
            return response.send(output);
        }

        var token = jwt.sign(
            { data: existingUser },
            process.env.API_TOKEN_KEY
        )

        const output = {
            _status: true,
            _message: 'Login Succesfully',
            _token: token,
            _data: existingUser
        }
        return response.send(output);
    } else {
        const output = {
            _status: false,
            _message: 'Invalid EmailId!',
            _data: null
        }
        return response.send(output);
    }
}
// View Profile
exports.viewProfile = async (request, response) => {
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
            await user.findOne({ _id: value.data._id, role_type: 'User' })
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

// Update Profile
exports.updateProfile = async (request, response) => {

    var token = request.headers.authorization.split(' ')[1];

    var varify = jwt.verify(token, process.env.API_TOKEN_KEY, async (error, value) => {

        if (error) {
            var output = {
                _status: false,
                _message: 'Token Verification failed',
                _data: null
            }
            return response.send(output)
        } else {
            // var saveData ={
            //     name:request.body.name,
            //     mobile_number:request.body.name
            // }

            // var saveData = request.body;

            var saveData = {};

            if (request.body.name !== undefined && request.body.name !== '') {
                saveData.name = request.body.name;
            }

            if (request.body.mobile_number !== undefined && request.body.mobile_number !== '') {
                saveData.mobile_number = request.body.mobile_number;
            }

            if (request.file) {
                saveData.imagew = request.file.filename;
            }

            await user.updateOne({ _id: value.data._id }, { $set: saveData })
                .then((result) => {
                    const output = {
                        _status: true,
                        _message: 'Profile Update !',
                        _data: result
                    }
                    response.send(output)

                })
                .catch((error) => {
                    const output = {
                        _status: false,
                        _message: "Somthing Went Wrong!!",
                        _data: error
                    }
                    response.send(output);
                })
        }

    })
}

// Change Password
exports.changePassword = async (request, response) => {

    var token = request.headers.authorization.split(' ')[1];

    var verify = jwt.verify(token, process.env.API_TOKEN_KEY, async (error, value) => {
        if (error) {
            const output = {
                _status: false,
                _message: "Token Verification failed !",
                _data: null
            }
            return response.send(output);
        } else {
            const existingUser = await user.findOne({ _id: value.data._id, delete_at: null, role_type: 'User' })

            if (existingUser) {
                if (!await bcrypt.compare(request.body.current_password, existingUser.password)) {

                    const output = {
                        _status: false,
                        _message: "Your Current password is incorrect. !",
                        _data: null
                    }
                    return response.send(output);
                }

                if (request.body.current_password == request.body.new_password) {
                    const output = {
                        _status: false,
                        _message: "Current Password and New Password Can't be same. !",
                        _data: null
                    }
                    return response.send(output)
                }
                if (request.body.new_password !== request.body.confirm_password) {

                    const output = {
                        _status: false,
                        _message: "New Password and Confirm Password do not match. !",
                        _data: null
                    }
                    return response.send(output)
                }

                // ✅ Password validation
                if (!request.body.new_password || request.body.new_password.trim().length < 4) {
                    return response.send({
                        _status: false,
                        _message: 'Password must be at least 4 characters long.',
                        _data: null
                    });
                }

                var newpassword = await bcrypt.hash(request.body.new_password, saltRounds);

                await user.updateOne({ _id: value.data._id }, { $set: { password: newpassword } })
                    .then((result) => {
                        const output = {
                            _status: true,
                            _message: 'Password Changed Successfully !!',
                            _data: result
                        }
                        response.send(output);
                    })
                    .catch((error) => {
                        const output = {
                            _status: false,
                            _message: 'Something Went Wrong !!',
                            _data: error
                        }
                        response.send(output);
                    });
            } else {
                const output = {
                    _status: false,
                    _message: 'User not found.',
                    _data: null
                };
                return response.send(output);
            }
        }
    })
}
// Forget Password
exports.forgetPassword = async (request, response) => {

    const existingUser = await user.findOne({ email: request.body.email, delete_at: null ,role_type: 'User' })

    if (!existingUser) {
        const output = {
            _status: false,
            _message: "Email Id Does not exit.!",
            _data: null
        }
        return response.send(output);
    }

    const token = jwt.sign(
        { data: existingUser },
        process.env.API_TOKEN_KEY,
        { expiresIn: "15m" }  // reset link valid only 15 minutes
    );
    const transporter = nodemailer.createTransport({
        // service : gmail,
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: '"Monsta" <' + process.env.EMAIL_USER + '>',
        to: request.body.email,
        subject: "Forgot Password",
        // text: "Hello world?", // plain‑text body
        html: "<b>Hello User</b> <br> Reset Password - http://localhost:3000/reset-password/" + token, // HTML body

    })

        .then(() => {

            const output = {
                _status: true,
                _message: 'Email send succussfully !',
                _data: null
            };
            return response.send(output);
        })
        .catch((error) => {
            const output = {
                _status: false,
                _message: 'Something went wrong !!',
                _data: error
            };
            return response.send(output);
        })
}


// Reset Password
exports.resetPassword = async (request, response) => {
    var token = request.headers.authorization.split(' ')[1];

    var verify = jwt.verify(token, process.env.API_TOKEN_KEY, async (error, value) => {

        if (error) {
            const output = {
                _status: false,
                _message: 'Token verification failed',
                _data: null
            };
            return response.send(output);
        } else {

            const existingUser = await user.findOne({ _id: value.data._id, delete_at: null ,role_type: 'User' })

            if (existingUser) {
                if (request.body.new_password !== request.body.confirm_password) {
                    const output = {
                        _status: false,
                        _message: 'New password and confirm password do not match.',
                        _data: null
                    };
                    return response.send(output);
                }
                // ✅ Password validation
                if (!request.body.new_password || request.body.new_password.trim().length < 4) {
                    return response.send({
                        _status: false,
                        _message: 'Password must be at least 4 characters long.',
                        _data: null
                    });
                }


                var newpassword = await bcrypt.hash(request.body.new_password, saltRounds);

                await user.updateOne({ _id: value.data._id }, { $set: { password: newpassword } })
                    .then((result) => {
                        const output = {
                            _status: true,
                            _message: 'Reset Password Successfully !!',
                            _data: result
                        }
                        response.send(output);
                    })
                    .catch((error) => {
                        const output = {
                            _status: false,
                            _message: 'Something Went Wrong !!',
                            _data: error
                        }
                        response.send(output);
                    });

            } else {

                const output = {
                    _status: false,
                    _message: 'User not found.',
                    _data: null
                };
                return response.send(output);

            }
        }
    })
}

