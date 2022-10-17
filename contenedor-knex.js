module.exports = class Contenedor {
  constructor(options, table) {
    this.knex = require("knex")(options);
    this.tabla = table;

    this.knex.schema.hasTable("mensajes").then(function (exists) {
      if (!exists) {
        return this.knex.schema.createTable("mensajes", function (t) {
          t.increments("id").primary();
          t.string("autor", 100);
          t.string("mensaje", 1000);
          t.string("hora");
          t.string("fecha");
        });
      }
    });
  }

  traerPorId(id) {
    this.knex
      .from(this.tabla)
      .select("*")
      .where({ id: id })
      .then((rows) => {
        return rows;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }

  traerTodo() {
    this.knex
      .from(this.tabla)
      .select("*")
      .then((rows) => rows);
  }

  agregarProducto(item) {
    let newItem = {
      name: item.name,
      price: item.price,
      thumbnail: item.thumbnail,
    };

    this.knex(this.tabla)
      .insert(newItem)
      .then(() => {
        console.log("Producto agregado");
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }

  editarProducto(id, item) {
    this.knex
      .from(this.tabla)
      .where({ id: id })
      .update({ name: item.name, price: item.price, thumbnail: item.thumbnail })
      .then(() => {
        console.log("Articulo actualizado");
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }

  deleteProduct(id) {
    this.knex(this.tabla)
      .where({ id: id })
      .del()
      .then(() => {
        console.log("articulo eliminado");
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => knex.destroy());
  }
};
