import Todo from "../models/Todo.js";

/* GET todos for logged-in user */
export const getTodos = async (req, res) => {
  try {
    const { userId } = req.query; // 🔥 from frontend

    if (!userId) {
      return res.status(400).json({ message: "User not provided" });
    }

    const todos = await Todo.find({ userId }).sort({ order: 1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

/* CREATE todo */
export const createTodo = async (req, res) => {
  try {
    const { title, completed = false, order = 0, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await Todo.create({
      title,
      completed,
      order,
      userId,
    });

    const todos = await Todo.find({ userId }).sort({ order: 1 });

    res.status(201).json(todos); // ✅ ARRAY ONLY
  } catch (err) {
    console.error("CREATE TODO ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* UPDATE todo */
export const updateTodo = async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};

/* DELETE todo */
export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};