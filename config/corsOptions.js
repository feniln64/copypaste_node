
const allowedOrigins=[
  'http://localhost:3000',
  'http://vscode.readyle.live:3000',
  'http://test.readyle.live:5000'
]

const re = new RegExp("(^|^[^:]+:\/\/|[^\.]+\.)readyle\.live");
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports = corsOptions