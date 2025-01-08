const express = require('express');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const app = express();
const PORT = 3000;
const BOOKINGS_FILE = path.join(__dirname, 'bookings.json');

app.use(express.json());

// Initialize bookings file if not exists
if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([]));
}

// Get all bookings
app.get('/bookings', (req, res) => {
    const bookings = JSON.parse(fs.readFileSync(BOOKINGS_FILE));
    res.json(bookings);
});

// Create a new booking
app.post('/bookings', (req, res) => {
    const { name, time } = req.body;
    if (!name || !time) {
        return res.status(400).json({ error: 'Name and time are required' });
    }

    const bookings = JSON.parse(fs.readFileSync(BOOKINGS_FILE));
    const newBooking = { id: Date.now(), name, time };
    bookings.push(newBooking);
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    res.json(newBooking);
});

// Delete a booking
app.delete('/bookings/:id', (req, res) => {
    const { id } = req.params;
    let bookings = JSON.parse(fs.readFileSync(BOOKINGS_FILE));
    bookings = bookings.filter(booking => booking.id !== parseInt(id));
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    res.json({ message: 'Booking deleted' });
});

// Auto-delete expired bookings (runs every minute)
cron.schedule('* * * * *', () => {
    let bookings = JSON.parse(fs.readFileSync(BOOKINGS_FILE));
    const now = Date.now();
    bookings = bookings.filter(booking => new Date(booking.time).getTime() > now);
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    console.log('Expired bookings cleaned');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
