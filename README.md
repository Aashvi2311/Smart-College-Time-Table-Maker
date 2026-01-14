# 🎓 Smart College Timetable Maker

A web-based intelligent timetable generation system that automatically creates conflict-free schedules using constraint-based scheduling algorithms.

## Features

✅ **Visual Grid Display**: Clean, color-coded timetable grid showing all classes, subjects, and teachers  
✅ **Automatic Conflict Detection**: Prevents scheduling conflicts for teachers, classes, and rooms  
✅ **Lab Scheduling**: Automatically allocates consecutive time slots for lab sessions  
✅ **Common Free Slots**: Identifies free periods shared across multiple classes for rescheduling  
✅ **Constraint-Based Algorithm**: Uses intelligent scheduling logic to generate valid timetables  
✅ **Real-time Validation**: Validates timetables and highlights any conflicts  

## Technologies Used

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Algorithm**: Constraint-based scheduling with greedy approach
- **Data**: In-memory (no database for prototype)

## Project Structure

```
smart-timetable-maker/
├── backend/
│   ├── server.js          # Express API server
│   ├── scheduler.js       # Scheduling algorithm
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── TimetableGrid.js
│   │   │   ├── ConfigPanel.js
│   │   │   └── FreeSlotsPanel.js
│   │   └── ...
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd smart-timetable-maker/backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd smart-timetable-maker/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will automatically open at `http://localhost:3000`

## Usage

1. **Load Sample Data**: Click "Load Sample Data" to see a pre-configured timetable
2. **View Timetables**: Select different classes from the dropdown to view their schedules
3. **Check Conflicts**: The system automatically validates and shows if the timetable is conflict-free
4. **Find Free Slots**: Select multiple classes and click "Find Common Free Slots" to identify shared free periods

## Algorithm Overview

The scheduler uses a constraint-based approach:

1. **Initialization**: Creates empty timetable structure for all classes, days, and time slots
2. **Assignment Priority**: Labs are scheduled first (require consecutive slots), followed by regular classes
3. **Constraint Checking**: For each assignment, validates:
   - Class availability (no double-booking)
   - Teacher availability (no teacher conflicts)
   - Sufficient consecutive slots for labs
4. **Greedy Placement**: Assigns each subject to the first valid slot found
5. **Validation**: Checks final timetable for any remaining conflicts

## API Endpoints

### POST `/api/generate-timetable`
Generates a complete timetable based on configuration
- **Body**: `{ config: {...} }` (optional, uses sample data if not provided)
- **Response**: `{ success, timetable, validation, config }`

### POST `/api/common-free-slots`
Finds common free slots across multiple classes
- **Body**: `{ classes: [...], config: {...} }`
- **Response**: `{ success, freeSlots }`

### GET `/api/sample-config`
Returns sample configuration data
- **Response**: Sample configuration object

## Future Enhancements

- Add custom configuration UI for manual input
- Implement room allocation logic
- Add database persistence (MongoDB/Firebase)
- Export timetables to PDF/Excel
- Teacher preference and availability constraints
- Multi-campus support
- Mobile responsive improvements

[!Sample Image 1](sample1.png)

[!Sample Image 2](sample2.png)
