const express = require("express");
const app = express();
const db = require("./models");

const userRoutes = require("./routes/user-routes");
const onboardRoutes = require("./routes/onboard-routes");
const ourserviceRoutes = require("./routes/ourservice-routes");
const authRoutes = require("./routes/Auth");
const orderRoutes = require("./routes/order-routes");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/" , userRoutes);
app.use("/" , authRoutes);
app.use("/" , onboardRoutes);
app.use("/" , ourserviceRoutes);
app.use("/" , orderRoutes);

db.sequelize.sync().then(()=>{
    app.listen(3000 , ()=>{console.log("server listening in port 3000");})
})
