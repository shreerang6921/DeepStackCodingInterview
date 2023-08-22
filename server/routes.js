const express = require("express");
const Todo = require("./models/todo");
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

module.exports = router;
