const userNames = [
  "Andrew",
  "Shane",
  "Dan",
  "Drew",
  "Rod",
  "Alviva",
  "Levi",
  "Tori",
  "Bryan",
  "Patrick",
  "Kyle",
  "Ryan",
  "Dave",
  "Eric",
  "CJ",
  "Jayden",
  "Lonz",
  "Bella",
  "Dereck",
  "Terry",
];

const appThoughts = [
  "This is a thought one",
  "This is a thought two",
  "This is a thought three",
  "This is a thought four",
  "This is a thought five",
  "This is a thought six",
  "This is a thought seven",
  "This is a thought eight",
  "This is a thought nine",
  "This is a thought ten",
  "This is a thought eleven",
  "This is a thought twelve",
  "This is a thought thirteen",
  "This is a thought fourteen",
  "This is a thought fifteen",
  "This is a thought sixteen",
  "This is a thought seventeen",
  "This is a thought eighteen",
  "This is a thought nineteen",
  "This is a thought twenty",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUser = () =>
  `${getRandomArrItem(userNames)} ${getRandomArrItem(userNames)}`;

const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

const getRandomThoughts = () => `${appThoughts[getRandomIndex(appThoughts)]}`;

// Function to generate random assignments that we can add to student object.
const generateThoughts = (int) => {
  let thought = "";
  for (let i = 0; i < int; i++) {
    thought += `${getRandomThoughts()}`;
  }
  return thought.trim();
};

// Export the functions for use in seed.js
module.exports = { getRandomUser, generateThoughts };
