const ElasticEmail = require("@elasticemail/elasticemail-client");
var Minio = require('minio')
const { default: axios } = require('axios');
const defaultClient = ElasticEmail.ApiClient.instance;
const apikey = defaultClient.authentications["apikey"];
apikey.apiKey =
  "D7525C69B59DB4259D4B211F95FA869147FE6F3C0AC644B1AF59E41D045429F45DCD4F52B73FD88C29011004B7A3951E";

const EmailsApi = new ElasticEmail.EmailsApi();

const cf = axios.create({
    baseURL: 'https://api.cloudflare.com/client/v4'
  });
  cf.defaults.headers.common["x-auth-key"] = "721d500a5a04d543e57d3a2c17e4bbe1036f2";
  cf.defaults.headers.common["X-Auth-Email"] = "fenilnakrani39@gmail.com";
var minioClient = new Minio.Client({
    endPoint: '207.211.187.125',
    port: 9000,
    useSSL: false,
    accessKey: 'pPAzlk6rv4x34C6GoJEd',
    secretKey: 'aYuVmUYJonn7ESKAcDOop1O2dEca0v3RipG3FUUx',
  })
module.exports={
    EmailsApi,
    minioClient,
    cf
}