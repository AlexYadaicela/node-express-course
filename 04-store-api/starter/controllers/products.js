const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("name")
    .select("name price")
    .limit(10)
    .skip(5);
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { feature, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (feature) {
    queryObject.feature = feature === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEX = /\b(>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEX,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];

    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  console.log(queryObject);
  let result = Product.find(queryObject);

  // sort result based on user indication
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // show required fields based on user indication
  if (fields) {
    const sortList = fields.split(",").join(" ");
    result = result.select(sortList);
  }

  // manage pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
