const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const path = require('path');
const cookieParser = require('cookie-parser');
const errorMiddleWare = require("./middleware/errorMiddleware");
const logger = require("./helpers/logger");
const authRoute = require("./routes/auth/auth");
const { generalData } = require("./middleware/generalData");
const userRoute = require("./routes/user/user");
const adminRoute = require("./routes/admin/admin");
const { userDetails } = require("./middleware/userInfo");
const generalRoute = require("./routes/general/general");
const { isUserLogin } = require("./middleware/isAuth");




try {



        /* MAIN WORK START HERE  */
         //Require ENV
require("dotenv").config()


//Required Database
require('./models/db');

const app = express();

//Cors
app.use(cors({origin:"*",credentials:true}))


//Helmet

  app.use(helmet(
  {
    contentSecurityPolicy: false,
  }
))


//Hpp Security
app.use(hpp())

  // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

  

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join('public')));

//Required JOB
require('./jobs/crediting');

global.__basedir = __dirname;

//General Datas
app.use(generalData(app))

//User Info
app.use(userDetails(app))
  
//Routes
  
//GENERAL ROUTE
app.use("/",generalRoute)

//AUTH ROUTE
app.use("/",authRoute)

//USER ROUTE
app.use("/user",userRoute)

//ADMIN ROUTE
app.use("/admin", isUserLogin, adminRoute)


//Error Middleware
app.use(errorMiddleWare)


app.listen(process.env.PORT || 3000) 
  

  process.on('uncaughtException', function (err) {
  logger.debug(err)
    
});

process.on('unhandledRejection', (reason, promise) => {
  logger.debug(reason)
})





  
} catch (error) {
  logger.debug(error)
}