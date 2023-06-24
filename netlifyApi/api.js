const  axios =  require("axios");


const axiosInstance = axios.create({
  baseURL: "https://api.netlify.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + process.env.NETLIFY_TOKEN,
  },
});



module.exports = axiosInstance;