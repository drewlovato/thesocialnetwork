const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomUser, generateThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  // Create empty array to hold the students
  const users = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const thought = generateThoughts(20);

    const userName = getRandomUser();
    const first = userName.split(" ")[0];
    const last = userName.split(" ")[1];
    const email = `${first}@${last}.com`;

    users.push({
      userName,
      email,
    });
  }

  // Add user to the collection and await the results
  await User.collection.insertMany(users);

  // Add user to the collection and await the results
  await User.collection.insertOne({
    userName: "Andrew",
    inPerson: false,
    users: [...users],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
