var Minio = require("minio");
const { default: axios } = require("axios");
require('dotenv').config()


const cf = axios.create({
  baseURL: "https://api.cloudflare.com/client/v4",
});
cf.defaults.headers.common["x-auth-key"] = "721d500a5a04d543e57d3a2c17e4bbe1036f2";
cf.defaults.headers.common["X-Auth-Email"] = "fenilnakrani39@gmail.com";

var minioClient = new Minio.Client({
  endPoint: "207.211.187.125",
  port: 9000,
  useSSL: false,
  accessKey: "pPAzlk6rv4x34C6GoJEd",
  secretKey: "aYuVmUYJonn7ESKAcDOop1O2dEca0v3RipG3FUUx",
});

module.exports = {
  minioClient,
  cf,
};
