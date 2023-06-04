
const allowedOrigins=[
  'http://localhost:3000',
  'http://vscode.readyle.live:3000',
  'http://test.readyle.live:5000'
]

const re = new RegExp("(^|^[^:]+:\/\/|[^\.]+\.)readyle\.live");
const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  credentials: true
}

module.exports = corsOptions