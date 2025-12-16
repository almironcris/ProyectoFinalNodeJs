import express from "express"
// configuro import pq instale libreria cors
import cors from "cors"

import { configDotenv } from "dotenv"
import rutasLog from "./src/routes/auth.routes.js"
import rutasProductos from "./src/routes/products.routes.js"
//// importo lo del src/routes/archivo que cree products.routes.js
//import rutasProductos from "./src/routes/products.routes.js";


const app = express();
const PORT = process.env.PORT || 3000;


//configuro cors ya que instale libreria cors
const corsConfig = {
    origin: ['http://localhost:3000/', 'https://midominio.com/'], // dominios permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'],                  // métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],          // cabeceras permitidas
    exposedHeaders: ['Content-Length'],                         // cabeceras visibles al cliente
    credentials: true,                                          // habilitar credenciales
    maxAge: 600,                                                // cache preflight
    optionsSuccessStatus: 204                                   // respuesta preflight exitosa
}

app.use(cors(corsConfig))
app.use(express.json())
app.use("/api", rutasLog)


// configuro cors manualmente. pero luego como instale libreria cors con npm start cors
//comento las lineas 13,14,15 y 16
app.use((req, res, next) => {
    console.log(`Datos recibidos a: ${req.method} ${req.url}`);
    next();
});

//configuro lo del src/routes
app.use("/api", rutasProductos);


// agregue para configurar el error 404 http://localhost:3000/rutax
app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado o ruta inválida');
});

app.listen(PORT, () => {
    console.log (`Servidor corriendo en http://localhost:${PORT}`)
})