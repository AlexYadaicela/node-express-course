const express = require("express");
const { products } = require("./data");

const app = express();
const port = 3000;

app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.status(500).json({
    message: "It workded!",
  });
});

// get all products
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

app.all("*", (req, res) => {
  res.status(404).send("<h1>page not found</h1>");
});

app.listen(port, () => {
  console.log(`server live at: http://localhost:${port}`);
});
