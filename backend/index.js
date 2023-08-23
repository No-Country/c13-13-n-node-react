const app = require("./src/app.js");
const { conn } = require("./src/db.js");
// Sincronización de todos los modelos:
const port = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
  app.listen(port, async () => {
    console.log("%s listening at 3001");
  });
});