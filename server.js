require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

const checkRole = require("./middelwares/checkRole");

const createUserController = require("./controllers/usersControllers/createUserController");
const loginUserController = require("./controllers/usersControllers/loginUserController");
const getAllUsersController = require("./controllers/usersControllers/getAllUSersController");
const authenticateToken = require("./middelwares/isAuth");
const editUserController = require("./controllers/usersControllers/editUserController");
const createCostumerController = require("./controllers/costumersControllers/createCostumerController");
const getAllCostumersController = require("./controllers/costumersControllers/getAllCostumersController");
const editCostumerController = require("./controllers/costumersControllers/editCostumerController");

//MIDDLEWARES

app.use(cors());
app.use(morgan("dev"));
app.use(express.static(process.env.UPLOADS_DIR));
app.use(express.json());
app.use(fileUpload());

//CONTROLLERS

//ENDPOINTS

//USERS

app.post("/login", loginUserController);

app.use(authenticateToken);

app.post("/users", checkRole(["admin"]), createUserController);

app.get("/users", checkRole(["admin"]), getAllUsersController);

app.put("/users/:id", checkRole(["admin"]), editUserController);

//delete**(its important?)

//WORKERS

app.post("/employees", checkRole(["admin"]));

//COSTUMERS

app.post("/costumer", checkRole(["admin"]), createCostumerController);

app.get(
  "/costumers",
  checkRole(["admin", "employee"]),
  getAllCostumersController
);

app.put("/costumers/:id", checkRole(["admin"]), editCostumerController);

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
