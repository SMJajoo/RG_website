import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Appointments data file
const appointmentsFile = path.join(__dirname, 'appointments.json');

// Initialize appointments file if it doesn't exist
if (!fs.existsSync(appointmentsFile)) {
  fs.writeFileSync(appointmentsFile, JSON.stringify([], null, 2));
}

// Get all appointments
app.get('/api/appointments', (req, res) => {
  try {
    const data = fs.readFileSync(appointmentsFile, 'utf8');
    const appointments = JSON.parse(data);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read appointments' });
  }
});

// Create new appointment
app.post('/api/appointments', (req, res) => {
  try {
    const {
      patientName,
      phone,
      date,
      time,
      doctor,
      purpose,
      age,
      gender,
      address,
      referredBy,
      notes,
    } = req.body;

    // Basic validation
    if (!patientName || !phone || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields (patientName, phone, date, time)' });
    }

    // Normalize phone to digits and expect 10 digits
    const cleanedPhone = ('' + phone).replace(/\D/g, '');
    if (cleanedPhone.length !== 10) {
      return res.status(400).json({ error: 'Phone must be 10 digits' });
    }

    // Parse date and time into ISO datetime
    const parseDateTime = (dateStr, timeStr) => {
      // dateStr may be YYYY-MM-DD or DD/MM/YYYY
      let year, month, day;
      if (dateStr.includes('/')) {
        const parts = dateStr.split('/').map(p => p.trim());
        if (parts[0].length === 4) {
          year = parseInt(parts[0]);
          month = parseInt(parts[1]);
          day = parseInt(parts[2]);
        } else {
          day = parseInt(parts[0]);
          month = parseInt(parts[1]);
          year = parseInt(parts[2]);
        }
      } else {
        const parts = dateStr.split('-');
        year = parseInt(parts[0]);
        month = parseInt(parts[1]);
        day = parseInt(parts[2]);
      }

      // timeStr may be HH:MM or H:MM AM/PM
      let hour = 0;
      let minute = 0;
      const ampmMatch = timeStr.match(/(AM|PM|am|pm)/);
      let timePart = timeStr.replace(/\s?(AM|PM|am|pm)/, '').trim();
      const t = timePart.split(':');
      hour = parseInt(t[0] || 0);
      minute = parseInt(t[1] || 0);
      if (ampmMatch) {
        const ampm = ampmMatch[0].toLowerCase();
        if (ampm === 'pm' && hour < 12) hour += 12;
        if (ampm === 'am' && hour === 12) hour = 0;
      }

      const dt = new Date(year, month - 1, day, hour, minute, 0, 0);
      return dt.toISOString();
    };

    const dateTime = parseDateTime(date, time);

    const data = fs.readFileSync(appointmentsFile, 'utf8');
    const appointments = JSON.parse(data);

    const newAppointment = {
      id: Date.now(),
      patientName,
      phone: cleanedPhone,
      date,
      time,
      dateTime,
      doctor: doctor || null,
      purpose: purpose || null,
      age: age || null,
      gender: gender || null,
      address: address || null,
      referredBy: referredBy || null,
      notes: notes || '',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    appointments.push(newAppointment);
    fs.writeFileSync(appointmentsFile, JSON.stringify(appointments, null, 2));

    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// Update appointment status (for hospital staff)
app.put('/api/appointments/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const data = fs.readFileSync(appointmentsFile, 'utf8');
    let appointments = JSON.parse(data);

    appointments = appointments.map(apt => {
      if (apt.id === parseInt(id)) {
        return { ...apt, status };
      }
      return apt;
    });

    fs.writeFileSync(appointmentsFile, JSON.stringify(appointments, null, 2));
    res.json({ message: 'Appointment updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// Delete appointment
app.delete('/api/appointments/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = fs.readFileSync(appointmentsFile, 'utf8');
    let appointments = JSON.parse(data);

    appointments = appointments.filter(apt => apt.id !== parseInt(id));

    fs.writeFileSync(appointmentsFile, JSON.stringify(appointments, null, 2));
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/appointments`);
});
