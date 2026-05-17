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
    const { fullName, phone, treatment, dateTime, notes } = req.body;

    // Validation (treatment is now optional)
    if (!fullName || !phone || !dateTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const data = fs.readFileSync(appointmentsFile, 'utf8');
    const appointments = JSON.parse(data);

    const newAppointment = {
      id: Date.now(),
      fullName,
      phone,
      // Only add treatment if present
      ...(treatment ? { treatment } : {}),
      dateTime,
      notes: notes || '',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    appointments.push(newAppointment);
    fs.writeFileSync(appointmentsFile, JSON.stringify(appointments, null, 2));

    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
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
