require('dotenv').config();
const mongoose =require('mongoose');
const { faker } = require('@faker-js/faker') 
const Department = require('./models/adminModels/Department') 

const departmentNames = [
  "Mathematics",
  "English Language",
  "Science",
  "Social Studies",
  "Computer Science",
  "Physical and Health Education",
  "Religious Studies",
  "Agricultural Science",
  "Civic Education",
  "Business Studies",
  "Home Economics",
  "Arts and Crafts",
  "Technical Drawing",
  "Music",
  "French",
  "Literature in English",
  "Economics",
  "Geography",
  "Biology",
  "Physics",
  "Chemistry",
  "History",
  "Government",
  "Commerce",
  "Guidance and Counselling",
  "Special Education"
];

async function generateDummyDepartments() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Generate dummy departments
    const departments = departmentNames.map(name => {
      const code = name.split(' ').map(word => word[0].toUpperCase()).join('');
      const description = faker.lorem.sentence();

      return new Department({
        name,
        code,
        description
      });
    });

    // Insert departments into the database
    await Department.insertMany(departments);
    console.log('Dummy departments generated successfully!');
  } catch (error) {
    console.error('Error generating dummy departments:', error);
  } finally {
    mongoose.connection.close();
  }
}

generateDummyDepartments();
