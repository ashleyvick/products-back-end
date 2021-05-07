const express = require("express");
const massive = require("massive");
const dotenv = require("dotenv");
dotenv.config();
const {
  create,
  getOne,
  getAll,
  update,
  deleteProduct,
} = require("./products_controller");

const app = express();
app.use(express.json());

massive({
  connectionString: process.env.CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((dbInstance) => {
    app.set("db", dbInstance);
    console.log("Successfully established connection with remote database");
  })
  .catch((e) => {
    console.log(e);
    return e;
  });

app.post("/api/products", create);
app.get("/api/products", getAll);
app.get("/api/products/:id", getOne);
app.put("/api/products/:id", update);
app.delete("/api/products/:id", deleteProduct);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Listening on port ${process.env.SERVER_PORT}`)
);
