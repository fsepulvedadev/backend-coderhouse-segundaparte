module.exports = class Contenedor {
  constructor(options, table) {
    this.knex = require("knex")(options);
    this.tabla = table;
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
        this.knex.destroy();
      });
  }

  traerTodo() {
    this.knex
      .from(this.tabla)
      .select("*")
      .then((rows) => {
        let response = [];
        for (let row of rows) {
          response.push({
            id: row["id"],
            name: row["nombre"],
            price: row["precio"],
          });
        }
        console.log(response);
        return response;
      });
  }

  agregarProducto(item) {
    console.log(item);

    let newItem = {
      nombre: item.name,
      precio: item.price,
      thumbnail: item.thumbnail,
    };

    this.knex(this.tabla)
      .insert({ nombre: item.name, precio: item.price, thumbnail: item.url })
      .then(() => {
        console.log("Producto agregado");
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        this.knex.destroy();
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
      .finally(() => this.knex.destroy());
  }
};
