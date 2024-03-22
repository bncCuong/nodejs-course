/** @format */

// File khởi động network của nodejs.

const app = require("./src/app");

//Khai báo PORT và khởi động sever

const PORT = process.env.PORT || 3009;

//khai báo sự kiện lắng nghe
const server = app.listen(PORT, () => {
  console.log(`Web start with port ${PORT}`);
});

//process là 1 quy trình trong nodejs
process.on("SIGINT", () => {
  //SIGINT == ctrl C
  server.close(() => {
    console.log("Exit server Express");
  });
});
