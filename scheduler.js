class TimetableScheduler {
  constructor(config) {
    this.classes = config.classes || [];
    this.teachers = config.teachers || [];
    this.rooms = config.rooms || [];
    this.subjects = config.subjects || [];
    this.timeSlots = config.timeSlots || [];
    this.days = config.days || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  }

  // Main scheduling function using constraint-based approach
  generateTimetable() {
    const timetable = {};
    const assignments = [];

    // Initialize timetable structure
    this.classes.forEach(cls => {
      timetable[cls] = {};
      this.days.forEach(day => {
        timetable[cls][day] = {};
        this.timeSlots.forEach(slot => {
          timetable[cls][day][slot] = null;
        });
      });
    });

    // Create assignment list (class-subject pairs that need scheduling)
    this.subjects.forEach(subject => {
      for (let i = 0; i < subject.periodsPerWeek; i++) {
        assignments.push({
          class: subject.class,
          subject: subject.name,
          teacher: subject.teacher,
          isLab: subject.isLab || false,
          duration: subject.isLab ? 2 : 1 // Labs take 2 consecutive slots
        });
      }
    });

    // Sort assignments by constraint complexity (labs first, then regular classes)
    assignments.sort((a, b) => b.duration - a.duration);

    // Try to schedule each assignment
    for (const assignment of assignments) {
      let scheduled = false;

      for (const day of this.days) {
        if (scheduled) break;

        for (const slot of this.timeSlots) {
          if (this.canSchedule(timetable, assignment, day, slot)) {
            this.scheduleAssignment(timetable, assignment, day, slot);
            scheduled = true;
            break;
          }
        }
      }

      if (!scheduled) {
        console.warn(`Could not schedule: ${assignment.subject} for ${assignment.class}`);
      }
    }

    return timetable;
  }

  // Check if an assignment can be scheduled at a specific time
  canSchedule(timetable, assignment, day, slot) {
    const { class: className, teacher, duration, isLab } = assignment;

    // Check if we need consecutive slots for labs
    if (duration > 1) {
      const slotIndex = this.timeSlots.indexOf(slot);
      if (slotIndex + duration > this.timeSlots.length) {
        return false; // Not enough consecutive slots
      }

      // Check all required slots
      for (let i = 0; i < duration; i++) {
        const checkSlot = this.timeSlots[slotIndex + i];
        if (!this.checkSlotAvailable(timetable, className, teacher, day, checkSlot)) {
          return false;
        }
      }
      return true;
    }

    return this.checkSlotAvailable(timetable, className, teacher, day, slot);
  }

  // Check if a single slot is available
  checkSlotAvailable(timetable, className, teacher, day, slot) {
    // Check if class already has something scheduled
    if (timetable[className][day][slot] !== null) {
      return false;
    }

    // Check if teacher is already assigned elsewhere
    for (const cls in timetable) {
      const entry = timetable[cls][day][slot];
      if (entry && entry.teacher === teacher) {
        return false; // Teacher conflict
      }
    }

    return true;
  }

  // Schedule an assignment
  scheduleAssignment(timetable, assignment, day, slot) {
    const { class: className, subject, teacher, duration, isLab } = assignment;
    const slotIndex = this.timeSlots.indexOf(slot);

    for (let i = 0; i < duration; i++) {
      const currentSlot = this.timeSlots[slotIndex + i];
      timetable[className][day][currentSlot] = {
        subject,
        teacher,
        isLab,
        isLabContinuation: i > 0 // Mark continuation slots for labs
      };
    }
  }

  // Find common free slots across multiple classes
  findCommonFreeSlots(classes) {
    const timetable = this.generateTimetable();
    const freeSlots = [];

    this.days.forEach(day => {
      this.timeSlots.forEach(slot => {
        const isCommonFree = classes.every(cls => 
          timetable[cls] && timetable[cls][day][slot] === null
        );

        if (isCommonFree) {
          freeSlots.push({ day, slot });
        }
      });
    });

    return freeSlots;
  }

  // Validate timetable for conflicts
  validateTimetable(timetable) {
    const conflicts = [];

    this.days.forEach(day => {
      this.timeSlots.forEach(slot => {
        const teacherUsage = {};
        const roomUsage = {};

        this.classes.forEach(cls => {
          const entry = timetable[cls][day][slot];
          if (entry) {
            // Check teacher conflicts
            if (teacherUsage[entry.teacher]) {
              conflicts.push({
                type: 'teacher',
                teacher: entry.teacher,
                day,
                slot,
                classes: [teacherUsage[entry.teacher], cls]
              });
            } else {
              teacherUsage[entry.teacher] = cls;
            }
          }
        });
      });
    });

    return {
      isValid: conflicts.length === 0,
      conflicts
    };
  }
}

module.exports = TimetableScheduler;
