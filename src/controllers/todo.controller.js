import Todo from "../models/Todo.js";

export const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user }).sort("order");
  res.json(todos);
};

export const createTodo = async (req, res) => {
  const todo = await Todo.create({
    ...req.body,
    user: req.user,
  });
  res.json(todo);
};

export const updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(todo);
};

export const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};