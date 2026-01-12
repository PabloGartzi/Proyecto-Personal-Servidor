const express = require("express"); //USAMOS EXPRESS PARA LA CONEXIÓN CON EL SERVIDOR
require('dotenv').config() //MANEJO DE VARIABLES DE ENTORNO
var cors = require("cors");
const http = require("http");
const { initSocket } = require("./socket");

//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');


const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });


const app = express()
const port = process.env.PORT;

//CUIDADO EN LA WHITELIST HAY QUE AÑADIR EL PUERTO QUE LLAMA DESDE EL FRONT
var whitelist = [
  "https://client-6sec.onrender.com",
  "https://server-yo1g.onrender.com", 
  `http://localhost:${port}`, 
  "http://localhost:3001",
  "http://localhost:5173",
  "http://127.0.0.1:3001",
  "https://proyecto-personal-cliente.vercel.app"
];

var corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Postman o server-side requests
    if (whitelist.includes(origin)) {
      return callback(null, true);
    }
    console.log("Origin bloqueado:", origin);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true, // <--- importante para cookies
};
app.use(cors(corsOptions));


//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//TEMPLATES

//MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

//RUTAS
app.use('/',require('./routes/auth.route')); //Ruta para autenticaciones
app.use('/admin', require('./routes/admin.route')); //Ruta para el panel de admin
app.use('/office', require('./routes/office.route')); //Ruta para el panel de office
app.use('/worker', require('./routes/worker.route')); //Ruta para el panel de worker

app.use("/alerts", require("./routes/alerts.route"));

/* ===== HTTP SERVER ===== */
const server = http.createServer(app);

/* ===== SOCKET.IO ===== */
initSocket(server, {
  origin: whitelist,
  methods: ["GET", "POST"],
  credentials: true
});

/* ===== LISTEN ===== */
server.listen(port, () => {
  console.log(`HTTP + Socket.IO en puerto ${port}`);
});