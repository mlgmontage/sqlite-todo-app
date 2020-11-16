const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const todos = await prisma.todos.findMany({
    orderBy: [{ TodoId: "desc" }],
  });
  res.json(todos);
});

router.post("/create", async (req, res) => {
  const body = req.body;

  const todo = await prisma.todos.create({
    data: body,
  });
  res.json(todo);
});

router.put("/complete/:id", async (req, res) => {
  const id = Number(req.params.id);
  const isCompleted = req.body.isCompleted;

  const completed = await prisma.todos.update({
    where: {
      TodoId: Number(id),
    },
    data: {
      isCompleted: isCompleted,
    },
  });

  res.json(completed);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const deleted = await prisma.todos.delete({
    where: {
      TodoId: id,
    },
  });

  res.json(deleted);
});

module.exports = router;
