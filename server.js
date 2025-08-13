import express from "express";
import connectDB from "./config/db.js";
import usersRoute from "./routes/api/users.js";
import usersAuth from "./routes/api/auth.js";
import usersPosts from "./routes/api/posts.js";
import usersProfile from "./routes/api/profile.js";

const app = express();
//Connect to the Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Welcome to Commithub! API running"));

// Define Routes
app.use("/api/users", usersRoute);
app.use("/api/posts", usersPosts);
app.use("/api/profile", usersProfile);
app.use("/api/auth", usersAuth);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
