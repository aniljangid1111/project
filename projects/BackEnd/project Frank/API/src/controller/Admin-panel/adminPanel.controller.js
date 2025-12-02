const Admin = require("../../models/admin")

const admincontroller = (req, res) => {
    try {
        res.status(200).json({ message: 'Success' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' })
    }
}

const registerAdmin = async (req, res) => {
    try {
        const ifAdmin = await Admin.findOne({ email: process.env.ADMINEMAIL })

        if (ifAdmin) return console.log('Already Have', ifAdmin);

        const data = new Admin({
            email: process.env.ADMINEMAIL,
            password: process.env.ADMINPASSWORD
        })

        const response = await data.save()

        console.log(response)


    } catch (error) {
        console.error(error)
    }
}

const loginAdmin = async (req, res) => {
    try {
        const ifadmin = await Admin.findOne({ email: req.body.email })

        if (!ifadmin) return res.status(403).json({ message: 'invaild email' })

        if (ifadmin.password !== req.body.password) return res.status(400).json({ message: 'Wrong password' })

        const { password, ...data } = ifadmin._doc;
        console.log(data)

        res.status(200).json({ message: 'success', _data: data })
    } catch (error) {

        res.status(500).json({ message: 'server error' })
    }
}

module.exports = {
    admincontroller,
    registerAdmin,
    loginAdmin
}