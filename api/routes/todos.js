const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const todos = await prisma.todos.findMany();
  res.json(todos);
});

router.post("/create", async (req, res) => {
  const body = req.body;

  const todos = await prisma.todos.create({
    data: body,
  });
  res.json(todos);
});

module.exports = router;
