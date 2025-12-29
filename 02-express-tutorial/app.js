const express = require("express");
const { products, people } = require("./data");
const peopleRouter = require("./routes/people");

const app = express();
const port = 3000;

// middleware function
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const date = new Date().getFullYear();
  console.log("logger print:", method, url, date);
  next();
};

app.use(logger);

app.use(express.static("./methods-public"));

app.get("/api/v1/test", (req, res) => {
  res.status(500).json({
    message: "It workded!",
  });
});

// START: API PRODUCTS
app.get("/api/v1/products", (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    console.error(error);
  }
});

// get product by id
app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (!product) {
    res.status(404).json({
      message: "That product was not found.",
    });
    return;
  }
  res.json({ item: product });
});

//get products by search query
app.get("/api/v1/query", (req, res) => {
  const { search, limit, priceLessThan } = req.query;
  let filterProducts = [...products];

  if (search) {
    filterProducts = products.filter((product) => {
      return product.name.startsWith(req.query.search);
    });
  }

  if (limit) {
    filterProducts = filterProducts.slice(0, Number(limit));
  }

  if (priceLessThan) {
    filterProducts = filterProducts.filter(
      (product) => product.price <= Number(priceLessThan)
    );
  }

  if (filterProducts.length < 1) {
    return res.status(200).json({
      success: true,
      products: [],
    });
  }

  res.json(filterProducts);
});
// END: API PRODUCTS

// START: API PEOPLE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/people", peopleRouter);

// END: API PEOPLE

// keep at end
app.all("*", (req, res) => {
  res.status(404).send("<h1>page not found</h1>");
});

app.listen(port, () => {
  console.log(`server live at: http://localhost:${port}`);
});
