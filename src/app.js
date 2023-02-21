import express  from "express";
import morgan from "morgan";

//Routes

import personRoute from "./routes/person.route";
import chatRoute from "./routes/chat.route";
import messageRoute from "./routes/message.route";




const app = express();

//Setttings
app.set("port", 4000);

//middlewares
var cors  = require('cors');

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());

//Routes

app.get("/", (req, res) => {
    res.send('<h1>Hola desde land page!</h1>')
});


app.use("/person", personRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);

export default app;