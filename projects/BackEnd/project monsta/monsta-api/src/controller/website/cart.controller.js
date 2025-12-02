const Cart = require("../../models/cart.js");
const Product = require("../../models/products.js");

// ✅ Add to cart
exports.addToCart = (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    Product.findById(product_id)
        .then((product) => {
            if (!product) {
                return res.send({
                    _status: false,
                    _message: "Product not found !!",
                    _data: null,
                });
            }

            const price = product.sale_price;
            const total = price * (quantity || 1);

            Cart.findOne({ user_id })
                .then((cart) => {
                    if (!cart) {
                        // 🆕 Create new cart
                        const newCart = new Cart({
                            user_id,
                            items: [{ product_id, quantity, price, total }],
                            sub_total: total,
                        });

                        newCart
                            .save()
                            .then((result) => {
                                res.send({
                                    _status: true,
                                    _message: "Cart created !!",
                                    _data: result,
                                });
                            })
                            .catch((error) => {
                                res.send({
                                    _status: false,
                                    _message: "Something went wrong !!",
                                    _data: error,
                                });
                            });
                    } else {
                        // 🔄 Update existing cart
                        const itemIndex = cart.items.findIndex(
                            (item) => item.product_id.toString() === product_id
                        );

                        if (itemIndex > -1) {
                            // already in cart → update qty
                            cart.items[itemIndex].quantity += quantity;
                            cart.items[itemIndex].total =
                                cart.items[itemIndex].quantity * price;
                        } else {
                            cart.items.push({ product_id, quantity, price, total });
                        }

                        cart.sub_total = cart.items.reduce((acc, item) => acc + item.total, 0);
                        cart.updated_at = Date.now();

                        cart
                            .save()
                            .then((result) => {
                                res.send({
                                    _status: true,
                                    _message: "Cart updated !!",
                                    _data: result,
                                });
                            })
                            .catch((error) => {
                                res.send({
                                    _status: false,
                                    _message: "Something went wrong !!",
                                    _data: error,
                                });
                            });
                    }
                })
                .catch((error) => {
                    res.send({
                        _status: false,
                        _message: "Something went wrong !!",
                        _data: error,
                    });
                });
        })
        .catch((error) => {
            res.send({
                _status: false,
                _message: "Something went wrong !!",
                _data: error,
            });
        });
};

// ✅ View cart (with product details)
exports.view = (req, res) => {
    Cart.findOne({ user_id: req.params._id })
        .populate({
            path: "items.product_id",
            select: "name image sale_price description",
        })
        .then((cart) => {
            if (!cart) {
                return res.send({
                    _status: false,
                    _message: "Cart is empty !!",
                    _data: [],
                });
            }
            res.send({
                _status: true,
                _message: "Cart fetched !!",
                _image_path: process.env.PRODUCTS_IMAGES,
                _data: cart,
            });
        })
        .catch((error) => {
            res.send({
                _status: false,
                _message: "Something went wrong !!",
                _data: error,
            });
        });
};

// ✅ Update cart item (quantity)
exports.updateItem = (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    Cart.findOne({ user_id })
        .then((cart) => {
            if (!cart) {
                return res.send({
                    _status: false,
                    _message: "Cart not found !!",
                    _data: null,
                });
            }

            const itemIndex = cart.items.findIndex(
                (item) => item.product_id.toString() === product_id
            );

            if (itemIndex > -1) {
                const price = cart.items[itemIndex].price;
                cart.items[itemIndex].quantity = quantity;
                cart.items[itemIndex].total = price * quantity;

                cart.sub_total = cart.items.reduce((acc, item) => acc + item.total, 0);
                cart.updated_at = Date.now();

                cart
                    .save()
                    .then((result) => {
                        res.send({
                            _status: true,
                            _message: "Cart item updated !!",
                            _data: result,
                        });
                    })
                    .catch((error) => {
                        res.send({
                            _status: false,
                            _message: "Something went wrong !!",
                            _data: error,
                        });
                    });
            } else {
                res.send({
                    _status: false,
                    _message: "Item not found in cart !!",
                    _data: null,
                });
            }
        })
        .catch((error) => {
            res.send({
                _status: false,
                _message: "Something went wrong !!",
                _data: error,
            });
        });
};

// ✅ Remove item
exports.removeItem = (req, res) => {
    const { user_id, product_id } = req.body;

    Cart.findOne({ user_id })
        .then((cart) => {
            if (!cart) {
                return res.send({
                    _status: false,
                    _message: "Cart not found !!",
                    _data: null,
                });
            }

            cart.items = cart.items.filter(
                (item) => item.product_id.toString() !== product_id
            );

            cart.sub_total = cart.items.reduce((acc, item) => acc + item.total, 0);
            cart.updated_at = Date.now();

            cart
                .save()
                .then((result) => {
                    res.send({
                        _status: true,
                        _message: "Item removed from cart !!",
                        _data: result,
                    });
                })
                .catch((error) => {
                    res.send({
                        _status: false,
                        _message: "Something went wrong !!",
                        _data: error,
                    });
                });
        })
        .catch((error) => {
            res.send({
                _status: false,
                _message: "Something went wrong !!",
                _data: error,
            });
        });
};

// ✅ Clear cart
exports.clear = (req, res) => {
    Cart.findOneAndDelete({ user_id: req.params.userId })
        .then((result) => {
            res.send({
                _status: true,
                _message: "Cart cleared !!",
                _data: result,
            });
        })
        .catch((error) => {
            res.send({
                _status: false,
                _message: "Something went wrong !!",
                _data: error,
            });
        });
};
