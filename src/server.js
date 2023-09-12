import express from "express";
import handlebars from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from "passport";
import initializePassportGitHub from "./config/github.passport.js";
import cookieParser from "cookie-parser";
import { initializePassportLocal } from "./config/passport.config.js";
import { initializePassportJWT } from "./config/jwt.passport.js";
import config from '../config.js'


import __dirname from './utils.js';

import viewsRouter from './routes/views.router.js'
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import sessionsRouter from './routes/sessions.router.js'

import { Server } from "socket.io";
import ProductManager from "./daos/mongodb/productManager.js";

//Initial configuration
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(session({
    store: new MongoStore({
        mongoUrl: config.MONGO_URL,
        ttl: 60
    }),
    secret: 'mongoSecret',
    resave: true,
    saveUninitialized: true
}));

initializePassportLocal();
initializePassportGitHub();
initializePassportJWT();
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())

///Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Static
app.use(express.static(__dirname+'/public'));

//Routers
app.use('/', viewsRouter);
app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)
app.use('/api/sessions', sessionsRouter)

const httpServer = app.listen(config.PORT, () => console.log(`Servidor levantado en: ${config.PORT}`));
const socketServer = new Server(httpServer)

export const productManager = new ProductManager();
const products = await productManager.getProductsForSocket();

socketServer.on('connection', socket => {
    console.log('new user '+ socket.id)
    socketServer.emit('sendUsers', products)
});

export default socketServer;