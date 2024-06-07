//JSON SERVER MODULE
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Path to your JSON file

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(
    jsonServer.rewriter({
        "/*" : "/$1",
    })
)
server.use(router);
server.listen(5000, () => {
  console.log('JSON Server is running');
});

//Export Module API

module.exports = server;