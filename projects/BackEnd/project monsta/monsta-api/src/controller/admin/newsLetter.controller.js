const newsLetter = require('../../models/newsLetter.js');
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
        const { email } = request.body;

        if (!email) {
            return response.send({ _status: false, _message: "Email is required!" });
        }

        // Check if subscriber exists
        let subscriber = await newsLetter.findOne({ email });

        if (subscriber) {
            if (subscriber.status === true) {
                // Already subscribed
                return response.send({
                    _status: false,
                    _message: "You are already subscribed!",
                    _data: subscriber
                });
            } else {
                // Previously unsubscribed → reactivate
                subscriber.status = true;
                await subscriber.save();

                // Send thank you mail
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: "Welcome back to Monsta!",
                    html: `
                        <h2>Welcome Back To Monsta!</h2>
                        <p>Thanks for subscribing again to our newsletter. 🎉</p>
                        <p>If you want to unsubscribe, click <a href="http://localhost:8001/api/admin/newsletter/unsubscribe?email=${email}">here</a></p>
                    `,
                });

                return response.send({
                    _status: true,
                    _message: "Subscription reactivated and mail sent!",
                    _data: subscriber
                });
            }
        }

        // New subscriber
        const data = new newsLetter({ email, status: true });
        const result = await data.save();

        // Send thank you mail
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Thank you for subscribing!",
            html: `
                <h2>Welcome To Monsta!</h2>
                <p>Thanks for subscribing to our newsletter. 🎉</p>
                <p>If you want to unsubscribe, click <a href="http://localhost:8001/api/admin/newsletter/unsubscribe?email=${email}">here</a></p>
            `,
        });

        response.send({
            _status: true,
            _message: 'Record Inserted & Mail Sent to User!!',
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
        if (request.body.email != undefined) {
            if (request.body.email != '') {
                var email = new RegExp(request.body.email, "i")
                orCondition.push({ email: email })
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

    var totalrecords = await newsLetter.find(filter).countDocuments();

    await newsLetter.find(filter)
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
exports.unsubscribe = async (req, res) => {
    try {
        const { email } = req.query; // link se ?email=... milega
        const subscriber = await newsLetter.findOne({ email });

        if (!subscriber) {
            return res.send({ _status: false, _message: "Email not subscribed!" });
        }

        subscriber.status = false;
        await subscriber.save();

        res.send(`
            <h2>Unsubscribed Successfully!</h2>
            <p>You have been unsubscribed from our newsletter. We're sad to see you go 😢</p>
        `);
    } catch (err) {
        res.send({ _status: false, _message: err.message });
    }
};


exports.details = async (request, response) => {

    await newsLetter.findById(request.params.id)
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

    await newsLetter.updateOne({
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
    await newsLetter.updateMany({
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
    await newsLetter.updateMany({

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