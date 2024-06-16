const express = require("express");
const app = express();
const db = require("./models");
var cookieParser = require('cookie-parser');

const testRoutes = require("./routes/test");

const userRoutes = require("./routes/user-routes");
const onboardRoutes = require("./routes/onboard-routes");
const ourserviceRoutes = require("./routes/ourservice-routes");
const authRoutes = require("./routes/Auth");
const orderRoutes = require("./routes/order-routes");
const truckRoutes = require("./routes/trucktype-routes");
const shipRoutes = require("./routes/shiptype-routes");
const OTPRoutes = require("./routes/OTP");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", testRoutes);
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", onboardRoutes);
app.use("/", ourserviceRoutes);
app.use("/", orderRoutes);
app.use("/", truckRoutes);
app.use("/", shipRoutes);
app.use("/", OTPRoutes);

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("server listening in port 3000");
  });
});

