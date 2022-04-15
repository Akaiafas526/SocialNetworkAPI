const mongoose = require("mongoose");
const db = require("../config/connection");
const { Thought, User } = require("../models");

const users = [
  {
    username: "akaiafas526",
    email: "akaiafas526@email.com",
  },
  {
    username: "dluzzo123",
    email: "dluzzo@email.com",
  },
];

const thoughts = [
  {
    thoughtText: "cool thought",
    username: "akaiafas526",
  },
  {
    thoughtText: "really cool thought",
    username: "dluzzo123",
  },
];

db.once("open", async () => {
  console.log("connected");

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  console.log("collection successfully dropped!");

  await User.create(users);
  console.log("users successfully created");

  for (let i = 0; i < thoughts.length; i++) {
    let thought = await Thought.create(thoughts[i]);
    await User.findOneAndUpdate(
        {
            username: thought.username
        },
        {
            $addToSet: {thoughts: thought._id}
        },
        {
            new : true
        }
    )
  }
  console.log('thoughts seeded successfully')
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
