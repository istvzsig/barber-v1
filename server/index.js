import express, { json } from 'express';
import { schedule } from 'node-cron';
import { join } from 'path';
import { existsSync, writeFileSync, readFileSync } from 'fs';

const app = express();
const PORT = 3000;
const BOOKINGS_FILE = 'db/bookings.json';

// app.use(json());

// Initialize bookings file if not exists
if (!existsSync(BOOKINGS_FILE)) {
    writeFileSync(BOOKINGS_FILE, JSON.stringify([]));
    console.log("Initialized db/bookings.json")
}

// Get all bookings
app.get('/bookings', (req, res) => {
    print(req)
    const bookings = JSON.parse(readFileSync(BOOKINGS_FILE));
    res.json(bookings);
});

// Create a new booking
app.post('/bookings', (req, res) => {
    const { name, time } = req.body;
    if (!name || !time) {
        return res.status(400).json({ error: 'Name and time are required' });
    }

    const bookings = JSON.parse(readFileSync(BOOKINGS_FILE));
    const newBooking = { id: Date.now(), name, time };
    bookings.push(newBooking);
    writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    res.json(newBooking);
});

// Delete a booking
app.delete('/bookings/:id', (req, res) => {
    const { id } = req.params;
    let bookings = JSON.parse(readFileSync(BOOKINGS_FILE));
    bookings = bookings.filter(booking => booking.id !== parseInt(id));
    writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    res.json({ message: 'Booking deleted' });
});

// Auto-delete expired bookings (runs every minute)
schedule('* * * * *', () => {
    let bookings = JSON.parse(readFileSync(BOOKINGS_FILE));
    const now = Date.now();
    bookings = bookings.filter(booking => new Date(booking.time).getTime() > now);
    writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    console.log('Expired bookings cleaned');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;