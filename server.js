const express = require('express');
const cors = require('cors');
const TimetableScheduler = require('./scheduler');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample data for testing
const sampleConfig = {
  classes: ['F3', 'F4', 'F1', 'F2', '10A', '10B', '11A', '11B'],
  teachers: ['Mr. Smith', 'Ms. Johnson', 'Dr. Brown', 'Mrs. Davis', 'Mr. Wilson', 'Ms. Taylor'],
  rooms: ['Room 101', 'Room 102', 'Lab 1', 'Lab 2'],
  timeSlots: ['9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00', '2:00-3:00', '3:00-4:00','4:00-5:00'],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  subjects: [
    { name: 'AIML Lab', class: 'F4', teacher: 'Mr. Smith', periodsPerWeek: 1, isLab: true },
    { name: 'Data Analytics', class: 'F4', teacher: 'Dr. Brown', periodsPerWeek: 2, isLab: false },
    { name: 'HSS Elective', class: 'F4', teacher: 'Dr. John', periodsPerWeek: 3, isLab: false },
    { name: 'Data Analytics Lab', class: 'F4', teacher: 'Ms. Johnson', periodsPerWeek: 1, isLab: true },
    { name: 'AIML', class: 'F4', teacher: 'Mrs. Davis', periodsPerWeek: 4, isLab: false },
    { name: 'Algorithms', class: 'F4', teacher: 'Mr. Wilson', periodsPerWeek: 3, isLab: false },
    { name: 'Algorithms Lab', class: 'F4', teacher: 'Mr. Wilson', periodsPerWeek: 1, isLab: true },
    { name: 'DSCO', class: 'F4', teacher: 'Mr. Rachel', periodsPerWeek: 3, isLab: false },
    { name: 'DSCO Lab', class: 'F4', teacher: 'Mr. Rachel', periodsPerWeek: 1, isLab: true },
    { name: 'Software Engineering', class: 'F4', teacher: 'Mr. Will', periodsPerWeek: 3, isLab: false },
    { name: 'Competitive Programming', class: 'F4', teacher: 'Ms. Alice', periodsPerWeek: 1, isLab: false },
    { name: 'Competitive Programming Lab', class: 'F4', teacher: 'Mr. Charlie', periodsPerWeek: 1, isLab: true },
    { name: 'EVS', class: 'F4', teacher: 'Mr. Bob', periodsPerWeek: 3, isLab: false },

    { name: 'AIML Lab', class: 'F3', teacher: 'Mr. Smith', periodsPerWeek: 1, isLab: true },
    { name: 'Data Analytics', class: 'F3', teacher: 'Dr. Brown', periodsPerWeek: 2, isLab: false },
    { name: 'HSS Elective', class: 'F3', teacher: 'Dr. John', periodsPerWeek: 3, isLab: false },
    { name: 'Data Analytics Lab', class: 'F3', teacher: 'Ms. Johnson', periodsPerWeek: 1, isLab: true },
    { name: 'AIML', class: 'F3', teacher: 'Mrs. Davis', periodsPerWeek: 4, isLab: false },
    { name: 'Algorithms', class: 'F3', teacher: 'Mr. Wilson', periodsPerWeek: 3, isLab: false },
    { name: 'Algorithms Lab', class: 'F3', teacher: 'Mr. Wilson', periodsPerWeek: 1, isLab: true },
    { name: 'DSCO', class: 'F3', teacher: 'Mr. Rachel', periodsPerWeek: 3, isLab: false },
    { name: 'DSCO Lab', class: 'F4', teacher: 'Mr. Rachel', periodsPerWeek: 1, isLab: true },
    { name: 'Software Engineering', class: 'F3', teacher: 'Mr. Will', periodsPerWeek: 3, isLab: false },
    { name: 'Competitive Programming', class: 'F3', teacher: 'Ms. Alice', periodsPerWeek: 1, isLab: false },
    { name: 'Competitive Programming Lab', class: 'F3', teacher: 'Mr. Charlie', periodsPerWeek: 1, isLab: true },
    { name: 'EVS', class: 'F3', teacher: 'Mr. Bob', periodsPerWeek: 3, isLab: false },

    { name: 'AIML Lab', class: 'F1', teacher: 'Mr. Smith', periodsPerWeek: 1, isLab: true },
    { name: 'Data Analytics', class: 'F1', teacher: 'Dr. Brown', periodsPerWeek: 2, isLab: false },
    { name: 'HSS Elective', class: 'F1', teacher: 'Dr. John', periodsPerWeek: 3, isLab: false },
    { name: 'Data Analytics Lab', class: 'F1', teacher: 'Ms. Johnson', periodsPerWeek: 1, isLab: true },
    { name: 'AIML', class: 'F1', teacher: 'Mrs. Davis', periodsPerWeek: 4, isLab: false },
    { name: 'Algorithms', class: 'F1', teacher: 'Mr. Wilson', periodsPerWeek: 3, isLab: false },
    { name: 'Algorithms Lab', class: 'F1', teacher: 'Mr. Wilson', periodsPerWeek: 1, isLab: true },
    { name: 'DSCO', class: 'F1', teacher: 'Mr. Rachel', periodsPerWeek: 3, isLab: false },
    { name: 'DSCO Lab', class: 'F1', teacher: 'Mr. Rachel', periodsPerWeek: 1, isLab: true },
    { name: 'Software Engineering', class: 'F1', teacher: 'Mr. Will', periodsPerWeek: 3, isLab: false },
    { name: 'Competitive Programming', class: 'F1', teacher: 'Ms. Alice', periodsPerWeek: 1, isLab: false },
    { name: 'Competitive Programming Lab', class: 'F1', teacher: 'Mr. Charlie', periodsPerWeek: 1, isLab: true },
    { name: 'EVS', class: 'F1', teacher: 'Mr. Bob', periodsPerWeek: 3, isLab: false },
    
    { name: 'AIML Lab', class: 'F2', teacher: 'Mr. Smith', periodsPerWeek: 1, isLab: true },
    { name: 'Data Analytics', class: 'F2', teacher: 'Dr. Brown', periodsPerWeek: 2, isLab: false },
    { name: 'HSS Elective', class: 'F2', teacher: 'Dr. John', periodsPerWeek: 3, isLab: false },
    { name: 'Data Analytics Lab', class: 'F2', teacher: 'Ms. Johnson', periodsPerWeek: 1, isLab: true },
    { name: 'AIML', class: 'F2', teacher: 'Mrs. Davis', periodsPerWeek: 4, isLab: false },
    { name: 'Algorithms', class: 'F2', teacher: 'Mr. Wilson', periodsPerWeek: 3, isLab: false },
    { name: 'Algorithms Lab', class: 'F2', teacher: 'Mr. Wilson', periodsPerWeek: 1, isLab: true },
    { name: 'DSCO', class: 'F2', teacher: 'Mr. Rachel', periodsPerWeek: 3, isLab: false },
    { name: 'DSCO Lab', class: 'F2', teacher: 'Mr. Rachel', periodsPerWeek: 1, isLab: true },
    { name: 'Software Engineering', class: 'F2', teacher: 'Mr. Will', periodsPerWeek: 3, isLab: false },
    { name: 'Competitive Programming', class: 'F2', teacher: 'Ms. Alice', periodsPerWeek: 1, isLab: false },
    { name: 'Competitive Programming Lab', class: 'F2', teacher: 'Mr. Charlie', periodsPerWeek: 1, isLab: true },
    { name: 'EVS', class: 'F2', teacher: 'Mr. Bob', periodsPerWeek: 3, isLab: false }
  ]
};

// Generate timetable endpoint
app.post('/api/generate-timetable', (req, res) => {
  try {
    const config = req.body.config || sampleConfig;
    const scheduler = new TimetableScheduler(config);
    const timetable = scheduler.generateTimetable();
    const validation = scheduler.validateTimetable(timetable);

    res.json({
      success: true,
      timetable,
      validation,
      config: {
        classes: config.classes,
        days: config.days,
        timeSlots: config.timeSlots
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Find common free slots endpoint
app.post('/api/common-free-slots', (req, res) => {
  try {
    const { classes, config } = req.body;
    const schedConfig = config || sampleConfig;
    const scheduler = new TimetableScheduler(schedConfig);
    const freeSlots = scheduler.findCommonFreeSlots(classes);

    res.json({
      success: true,
      freeSlots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get sample configuration
app.get('/api/sample-config', (req, res) => {
  res.json(sampleConfig);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
