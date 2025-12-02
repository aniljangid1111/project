const enquiry = require('../../models/enquiry.js');
const nodemailer = require('nodemailer');
require('dotenv').config()


// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

exports.create = async (request, response) => {
    try {
        const saveData = request.body;
        const data = new enquiry(saveData);
        const result = await data.save();

        const adminMailOptions = {
            from: `"${result.name}" <${process.env.EMAIL_USER}>`, 
            to: process.env.EMAIL_USER, 
            replyTo: request.body.email,
            subject: `New Enquiry from ${result.name}`,
            html: `
        <h2>New Enquiry Received</h2>
        <p><b>Name:</b> ${result.name}</p>
        <p><b>Email:</b> ${result.email}</p>
        <p><b>Mobile:</b> ${result.mobile_number}</p>
        <p><b>Subject:</b> ${result.subject}</p>
        <p><b>Message:</b> ${result.message}</p>
        <p><i>Received on: ${new Date().toLocaleString()}</i></p>
    `,
        };

        transporter.sendMail(adminMailOptions, (error, info) => {
            if (error) {
                console.error("Mail error:", error);
            } 
        });

        // API Response
        response.send({
            _status: true,
            _message: 'Record Inserted & Mail Sent to Admin!!',
            _data: result
        });

    } catch (error) {
        const errormessage = error.errors
            ? Object.values(error.errors).map(err => err.message)
            : [error.message];

        response.send({
            _status: false,
            _message: 'Something went wrong !!',
            _data: errormessage
        });
    }
};

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
    }

    if (addCondition.length > 0) {
        var filter = { $and: addCondition }
    } else {
        var filter = {}

    }

    if (orCondition.length > 0) {
        filter.$or = orCondition;
    }

    var totalrecords = await enquiry.find(filter).countDocuments();

    await enquiry.find(filter)
        .sort({ order: 1, _id: -1 })
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
                    _totalUser: totalrecords,
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

    await enquiry.findById(request.params.id)
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

    var saveData = request.body;

    await enquiry.updateOne({
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
    await enquiry.updateMany({
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
    await enquiry.updateMany({

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