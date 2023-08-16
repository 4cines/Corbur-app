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
const editUserController = require("./controllers/usersControllers/editUserController");

const authenticateToken = require("./middelwares/isAuth");

const createCostumerController = require("./controllers/costumersControllers/createCostumerController");
const getAllCostumersController = require("./controllers/costumersControllers/getAllCostumersController");
const editCostumerController = require("./controllers/costumersControllers/editCostumerController");
const getOnlyCostumerController = require("./controllers/costumersControllers/getOnlyCostumerController");

const createEmployeeController = require("./controllers/employeesControllers/createEmployeeController");
const getAllEmployeesController = require("./controllers/employeesControllers/getAllEmployeesController");
const getOnlyEmployeesController = require("./controllers/employeesControllers/getOnlyEmployeesController");
const editEmployeeController = require("./controllers/employeesControllers/editEmployeeController");
const createWorkplaceController = require("./controllers/workplaceController/createWorkplaceController");
const getAllWorkplacesController = require("./controllers/workplaceController/getAllWorkplacesController");
const getOnlyWorkplacesController = require("./controllers/workplaceController/getOnlyWorkplaceController");
const getOnlyUserController = require("./controllers/usersControllers/getOnlyUserController");

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
app.get("/users/info", checkRole(["admin", "employee"]), getOnlyUserController);
app.put("/users/:id", checkRole(["admin"]), editUserController);
//delete**(its important?)

//EMPLOYEES
app.post("/employees", checkRole(["admin"]), createEmployeeController);
app.get("/employees", checkRole(["admin"]), getAllEmployeesController);
app.get("/employees/:id", checkRole(["admin"]), getOnlyEmployeesController);
app.put("/employees/:id", checkRole(["admin"]), editEmployeeController);

//COSTUMERS
app.post("/costumers", checkRole(["admin"]), createCostumerController);
app.get(
  "/costumers",
  checkRole(["admin", "employee"]),
  getAllCostumersController
);
app.get(
  "/costumers/:id",
  checkRole(["admin", "employee"]),
  getOnlyCostumerController
);
app.put("/costumers/:id", checkRole(["admin"]), editCostumerController);

//WORKPLACES
app.post("/workplaces", checkRole(["admin"]), createWorkplaceController);
app.get(
  "/workplaces",
  checkRole(["admin", "employee"]),
  getAllWorkplacesController
);
app.get(
  "/workplaces/:id",
  checkRole(["admin", "employee"]),
  getOnlyWorkplacesController
);

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
