const express = require("express");
const app = express();
const cors = require("cors");
const { createUser, userChecker } = require("./controller/userController");
const { errorHandler, notFound } = require("./middleware/common/errorHandler");
const postRouter = require("./router/postRouter");
const userRouter = require("./router/userRouter");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send(" Hi jaminur");
});

app.post("/user", userChecker, createUser);
app.use("/user", userRouter);
app.use("/post", postRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("server listing port 5000");
});
