const express = require("express");
const Todo = require("./models/todo");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/api/notes", async (req, res) => {
  const todo = await Todo.find({});
  res.json(todo);
});

router.post("/api/notes", async (req, res) => {
  try {
    const { note, title } = req.body;

    const todo = await Todo.create({
      title,
      note,
    });

    res.json({ message: "success" });
  } catch (e) {
    console.log(e);
  }
});

router.delete("/api/notes", async (req, res) => {
  try {
    const { title } = req.body;
    await Todo.findOneAndDelete({ title: title });
    res.json({ message: "Successfully deleted the note" });
  } catch (e) {
    console.log(e);
  }
});

router.patch("/api/notes", async (req, res) => {
  try {
    const { title, note } = req.body;

    const todo = await Todo.findOneAndUpdate({ title: title }, { note });

    res.json({ message: "success" });
  } catch (e) {
    console.log(e);
  }
});

router.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const encryptedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: encryptedPass,
    });
    res.json({ message: "register successful" });
  } catch (e) {
    console.log(e);
  }
});

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.json({ message: "user not found" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.json({ message: "incorrect email or password" });
  } else {
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);

    res.json({ message: "login successful", AuthToken: token });
  }
});

module.exports = router;
