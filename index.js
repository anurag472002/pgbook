const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// CORS Configuration
app.use(cors({
  origin: "https://anurag472002.github.io",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  }),
);

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://ojhaditya123:ojha12345@cluster0.x3owoxu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

// Define User Schema and Model
const User = mongoose.model("User", {
  username: String,
  password: String,
});

// Signup Route post req
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send("User signed up successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error signing up user");
  }
});

// Login Route post req
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.password !== password) {
      return res.status(401).send("Incorrect password");
    }
    res.status(200).send("Login successful!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in user");
  }
});

// Rest of your existing code...

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
