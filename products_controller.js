module.exports = {
  create: (req, res) => {
    const dbInstance = req.app.get("db");
    const { name, description, price, image_url } = req.body;
    dbInstance
      .create_product([name, description, price, image_url])
      .then(() => {
        res.sendStatus(200);
      })
      .catch((e) => {
        res
          .status(500)
          .send(
            { errorMessage: "Oh no! Having trouble creating your product" },
            console.log(e)
          );
      });
  },

  getOne: (req, res) => {
    const { id } = req.params;
    const dbInstance = req.app.get("db");
    dbInstance
      .read_product([id])
      .then((product) => {
        res.status(200).send(product);
      })
      .catch((e) => {
        res
          .status(500)
          .send(
            { errorMessage: "Oops! Having trouble recovering your product" },
            console.log(e)
          );
      });
  },

  getAll: (req, res) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .read_products()
      .then((products) => {
        res.status(200).send(products);
      })
      .catch((e) => {
        res.status(500).send(
          {
            errorMessage: "Oops! Having trouble recovering all your products",
          },
          console.log(e)
        );
      });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { params, query } = req;
    const dbInstance = req.app.get("db");
    dbInstance
      .update_product([params.id, query.desc])
      .then(() => res.sendStatus(200))
      .catch((e) => {
        res
          .status(500)
          .send(
            { errorMessage: "Cannot process your request." },
            console.log(e)
          );
      });
  },

  deleteProduct: (req, res) => {
    const { id } = req.params;
    const dbInstance = req.app.get("db");
    dbInstance
      .delete_product([id])
      .then(() => res.sendStatus(200))
      .catch((e) => {
        res
          .status(500)
          .send(
            { errorMessage: "Cannot proccess your request at this time." },
            console.log(e)
          );
      });
  },
};
