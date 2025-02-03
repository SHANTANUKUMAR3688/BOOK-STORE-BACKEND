const express = require("express");
const app = express();
const cors = require("cors");
const database=require("./config/database")
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require('dotenv').config()

// middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://book-store-frontend-24sf.vercel.app'],
    credentials: true
}))

// routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route")
const userRoutes =  require("./src/users/user.route")
const adminRoutes = require("./src/stats/admin.stats")

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

// async function main() {
//   await mongoose.connect(process.env.DB_URL);
//   app.use("/", (req, res) => {
//     res.send("Book Store Server is running!");
//   });
// }

//main().then(() => console.log("Mongodb connect successfully!")).catch(err => console.log(err));

//database connect
database.connect();
//default route
app.get("/", (req, res) => {
  console.log(req)
  return res.json({
  success:true,
  message:'Your server is up and running....'
});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
