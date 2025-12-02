const userList = require('../../models/user.js');
const product = require('../../models/products.js');
const category = require('../../models/category.js');

exports.view = (req, res) => {
  const filter = { delete_at: null };
  

  // Count promises
  const userCount = userList.countDocuments(filter);
  const productCount = product.countDocuments(filter);
  const categoryCount = category.countDocuments(filter);

  // Promise.all
  Promise.all([userCount, productCount, categoryCount])
    .then((results) => {
      const finalCounts = [
        { title: "Users", value: results[0] },
        { title: "Products", value: results[1] },
        { title: "Categories", value: results[2] },
      ];

      res.send({
        _status: true,
        _message: "Dashboard data fetched successfully!",
        _data: finalCounts,
      });
    })
    .catch((error) => {
      res.send({
        _status: false,
        _message: "Something went wrong!",
        _data: error,
      });
    });
};
