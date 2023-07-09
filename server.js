require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

const checkRole = require("./middelwares/checkRole");

const createUserController = require("./controllers/usersController/createUserController");
const loginUserController = require("./controllers/usersController/loginUserControlles");
const getAllUsersController = require("./controllers/usersController/getAllUSersController");

//MIDDLEWARES

app.use(cors());
app.use(morgan("dev"));
app.use(express.static(process.env.UPLOADS_DIR));
app.use(express.json());
app.use(fileUpload());

//CONTROLLERS

//ENDPOINTS

//USERS

//create
app.post("/users", createUserController);

//login
app.post("/login", loginUserController);

//get all users
app.get("/users", checkRole(["admin"]), getAllUsersController);

//update

//delete**(its important?)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//ERROR MIDDLEWARE

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.httpStatus || 500).send({
    status: "error",
    message: err.message,
  });
});

//MIDDLEWARE PATH NOT FOUND
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "PATH NOT FOUND",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});