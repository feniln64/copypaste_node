
const allowedOrigins=[
  'http://localhost:3000',
  'http://new.localhost:3000',
  'http://new.test.localhost:3000',

  'http://test.localhost:3000',

  'https://localhost:4100',
  'https://new.localhost:4100',
  'http://vscode.readyle.live:3000',
  'http://test.readyle.live:5000',
  'https://react.readyle.live',
  'http://react.readyle.live',
]

const re = new RegExp("(^|^[^:]+:\/\/|[^\.]+\.)readyle\.live");
const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  credentials: true,
}

module.exports = corsOptions