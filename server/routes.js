const express = require("express");
const Todo = require("./models/todo");
const router = express.Router();

router.get("/api/notes", async (req, res) => {
  const todo = await Todo.find({});
  // console.log(todo);
  res.json(todo);
});

router.post("/api/notes", async (req, res) => {
  const { note, title } = req.body;

  const todo = await Todo.create({
    title,
    note,
  });

  res.json({ message: "success" });
});

router.delete("/api/notes", async (req, res) => {
  const { title } = req.body;
  await Todo.findOneAndDelete({ title: title });
  res.json({ message: "Successfully deleted the note" });
});

router.patch("/api/notes", async (req, res) => {
  const { title, note } = req.body;

  const todo = await Todo.findOneAndUpdate({ title: title }, { note });

  res.json({ message: "success" });
});

module.exports = router;
