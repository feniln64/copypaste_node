var Minio = require("minio");
const { default: axios } = require("axios");
require('dotenv').config()


const cf = axios.create({
  baseURL: "https://api.cloudflare.com/client/v4",
});
cf.defaults.headers.common["x-auth-key"] = process.env.CLOUDFALRE_API_KEY;
cf.defaults.headers.common["X-Auth-Email"] = process.env.CLOUDFLARE_EMAIL;

var minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY_ID,
  secretKey: process.env.MINIO_ACCESS_KEY_SECRET,
});

module.exports = {
  minioClient,
  cf,
};
