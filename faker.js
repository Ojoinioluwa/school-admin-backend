const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');
const SchoolCalender = require('./models/adminModels/SchoolCalender'); // adjust the path

// MongoDB connection
mongoose.connect('mongodb+srv://ojoinioluwa05:owobCi68qHHWKbQG@oay.vupnvf7.mongodb.net/schooolAdmin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Function to generate date in YYYY-MM-DD format
const getRandomDate = () => {
  const year = 2024;  // You can adjust the year or make it random
  const month = faker.number.int({ min: 1, max: 12 }); // Updated to faker.number.int
  const day = faker.number.int({ min: 1, max: 28 });  // To ensure valid dates

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

// Generate 20 random events
const events = [];

for (let i = 0; i < 20; i++) {
  events.push({
    date: getRandomDate(),  // Random date in YYYY-MM-DD format
    eventTitle: faker.company.catchPhrase(), // Random event title
    eventDesc: faker.lorem.sentence(10), // Random event description
  });
}

// Insert into the database
SchoolCalender.insertMany(events)
  .then((docs) => {
    console.log('Events added:', docs.length);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting events:', err);
    mongoose.connection.close();
  });
