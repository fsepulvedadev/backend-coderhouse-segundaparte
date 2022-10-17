const express = require("express");
const PORT = 8080;
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const ContenedorKnex = require("./contenedor-knex");
const { optionsMariaDB, optionsSQLite } = require("./dbs/dbs");

const contenedorMensajes = new ContenedorKnex(optionsSQLite, "mensajes");
const contenedorProductos = new ContenedorKnex(optionsMariaDB, "productos");

app.use(express.static("./public"));
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/productos", (req, res) => {
  res.send(JSON.stringify(contenedorProductos.traerTodo()));
});
const fecha = new Date();
const mensajes = [
  {
    author: "Juan",
    text: "Hola que tal",
    date: `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`,
    hour: `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`,
  },
  {
    author: "Maria",
    text: "Bien y vos?",
    date: `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`,
    hour: `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`,
  },
  {
    author: "Juan",
    text: "Me alegra",
    date: `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`,
    hour: `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`,
  },
];

io.on("connection", (socket) => {
  console.log("se conecto un usuario");
  socket.emit("productos", contenedorProductos.traerTodo());
  socket.emit("mensajes", mensajes);
  socket.on("new-product", (data) => {
    contenedorProductos.agregarProducto(data);
    io.sockets.emit("productos", contenedorProductos.traerTodo());
  });
  socket.on("new-mensaje", (mensaje) => {
    mensajes.push({
      autor: mensaje.author,
      mensaje: mensaje.text,
      fecha: `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`,
      hora: `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`,
    });
    io.sockets.emit("mensajes", mensajes);
  });
});
httpServer.listen(8080, () => console.log("servidor Levantado"));
