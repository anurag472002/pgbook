const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

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

// Dummy data for demonstration
const pgAccommodations = [
  {
    id: 1,
    location: "Basavangudi",
    rent: 10000,
    imgurl:
      "https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/v1585641608/Website/CMS-Uploads/jngndizti95zwd5meio0.jpg",
    pagelink: "test.html",
  },
  {
    id: 2,
    location: "Jayanagar",
    rent: 12000,
    imgurl:
      "https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/v1585230219/Website/CMS-Uploads/gg2kktgdcehsmf1rxoei.jpg",
    pagelink: "stanza.html",
  },
  {
    id: 3,
    location: "Banashankari",
    rent: 9000,
    imgurl:
      "https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/v1580447945/Website/CMS-Uploads/osin1be3lvn0cn7f5v5b.jpg",
    pagelink: "gayatri.html",
  },
  {
    id: 4,
    location: "Basavangudi",
    rent: 11000,
    imgurl:
      "https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/f_auto,q_auto/v1658229640/Website/CMS-Uploads/exhwckhh0zbangvdrrjl.jpg",
    pagelink: "shradha.html",
  },
  {
    id: 5,
    location: "Banashankari",
    rent: 11000,
    imgurl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl_CMC_lTIeD25vCuh7tqqRLWJFMYyLFuWDQ&usqp=CAU",
    pagelink: "lakshmi.pg",
  },
  {
    id: 6,
    location: "Jayanagar",
    rent: 11000,
    imgurl:
      "https://kripalhomes.com/wp-content/uploads/2023/02/WhatsApp-Image-2020-07-31-at-12.02.36-PM.jpeg",
  },
  {
    id: 7,
    location: "Basavangudi",
    rent: 11000,
    imgurl:
      "https://imagecdn.99acres.com/media1/23569/2/471382128M-1707043145377.webp",
  },
];

app.get("/search", (req, res) => {
  const location = req.query.location;
  // Simulated backend logic to filter results
  const filteredResults = pgAccommodations.filter((accommodation) =>
    accommodation.location.toLowerCase().includes(location.toLowerCase()),
  );
  res.json(filteredResults);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// index.js
