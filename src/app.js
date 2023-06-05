import express from "express";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import __dirname from "./utils.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import Home from "./routes/home.router.js";
import SingIn from "./routes/singup.router.js";
import Profile from "./routes/profile.router.js";
import https from "https";
import fs from "fs";

const app = express();
const PORT = config.app.PORT

app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use(express.json());
app.use(express.static(__dirname+'/public'));
//app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:true}));

app.use(cors());
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

app.use('/account',SingIn);
app.use('/',Home);

const options = {
    key: fs.readFileSync(`${config.certificate.KEY}.pem`),
    cert: fs.readFileSync(`${config.certificate.FILENAME}.pem`),
};
  
const server = https.createServer(options, app);

server.listen(PORT, () => console.log(`Server listening on port:${PORT}`));