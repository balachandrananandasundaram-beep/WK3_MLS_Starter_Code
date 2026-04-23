import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import User from "../models/user.js";
import Subreddit from "../models/subreddit.js";
import Thread from "../models/thread.js";

const uri = process.env.MONGODB_URI;

async function viewData() {
  await mongoose.connect(uri);
  console.log("Connected");

  const users = await User.find();
  const subs = await Subreddit.find();
  const threads = await Thread.find();

  console.log("Users:", users);
  console.log("Subreddits:", subs);
  console.log("Threads:", threads);

  await mongoose.disconnect();
  console.log("Disconnected");
}

viewData();
