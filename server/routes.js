const Pet = require("./models/pets");
const express = require("express");
const User = require("./models/user");

const router = express.Router();

router.get("/pets", async (req, res) => {
  const pets = await Pet.find({});
  return res.json(pets);
});

router.post("/pets", async (req, res) => {
  const { name, type, age } = req.body;
  try {
    const pet = await Pet.create({
      name,
      type,
      age,
    });
    console.log(pet);
    return res.json({ status: "success" });
  } catch (err) {
    console.log(err);
    return res.json({ status: failed, error: err });
  }
});

router.post("/singup", async (req, res) => {});
router.post("/login", async (req, res) => {});

module.exports = router;
