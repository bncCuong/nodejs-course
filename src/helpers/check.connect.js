/** @format */

"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _SECONDS = 5000;

//count connect
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connection:: ${numConnection}`);
};

//check over load - hệ thống quá tải
const checkOverLoad = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length; //kiểm tra CPU có bao nhiêu core
    const memoryUsage = process.memoryUsage().rss; // Lấy ra số lượng memory đã sử dụng

    console.log(`Memory usage : ${memoryUsage / 1024 / 1024} MB`);
    //Ví dự CPU có thể kết nối tối đa là 5 connection là 5
    const maxConnections = numCores * 5;

    if (numConnection > maxConnections) {
      console.log("Connection overload detected!!!");
    } // Nếu số lượng connect lớn hơn số lượng tối đa mà CPU có thể chịu tải
  }, _SECONDS); // Monitor every 5s
};
module.exports = {
  countConnect,
  checkOverLoad,
};
