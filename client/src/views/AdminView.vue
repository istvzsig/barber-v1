<template>
    <div>
        <h1>Booking Manager</h1>
        <div v-if="bookings.length === 0">
            <p>No bookings available.</p>
        </div>
        <table v-else>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Hour</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="booking in bookings" :key="booking.id">
                    <td>{{ booking.name }}</td>
                    <td>{{ booking.time }}</td>
                    <td>{{ booking.hour }}</td>
                    <td>
                        <button class="edit-booking-button" @click="editBooking(booking)">Edit</button>
                        <button class="delete-booking-button" @click="deleteBooking(booking.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Edit Modal -->
        <div v-if="editingBooking" class="modal">
            <h2>Edit Booking</h2>
            <form @submit.prevent="submitEditBooking">
                <label for="editName">Name:</label>
                <input type="text" v-model="editingBooking.name" required />
                <br />
                <label for="editTime">Time:</label>
                <input type="date" v-model="editingBooking.time" required />
                <br />
                <label for="editHour">Hour:</label>
                <input type="time" v-model="editingBooking.hour" required />
                <br />
                <button type="submit">Save Changes</button>
                <button @click.prevent="cancelEdit">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bookings: [],
            editingBooking: null, // To hold the booking being edited
        };
    },
    created() {
        this.fetchBookings(); // Initial load
        setInterval(this.fetchBookings, 5000);
    },
    methods: {
        // Fetch all bookings from the backend
        async fetchBookings() {
            try {
                // TODO: Update enpoint for production
                const response = await fetch('http://localhost:3000/bookings');
                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }
                this.bookings = await response.json();
            } catch (error) {
                console.error(error);
            }
        },

        // Handle the deletion of a booking
        async deleteBooking(id) {
            try {
                // TODO: Update enpoint for production
                const response = await fetch(`http://localhost:3000/bookings/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete booking');
                }
                this.bookings = this.bookings.filter((booking) => booking.id !== id);
                alert('Booking deleted successfully');
            } catch (error) {
                console.error(error);
                alert('Error deleting booking');
            }
        },

        // Start the editing process by filling the form with the booking data
        editBooking(booking) {
            this.editingBooking = { ...booking }; // Create a copy to avoid mutating the original
        },

        // Submit the edited booking
        async submitEditBooking() {
            try {
                // TODO: Update enpoint for production
                const response = await fetch(`http://localhost:3000/bookings/${this.editingBooking.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.editingBooking),
                });
                if (!response.ok) {
                    throw new Error('Failed to update booking');
                }
                this.bookings = this.bookings.map((booking) =>
                    booking.id === this.editingBooking.id ? this.editingBooking : booking
                );
                this.editingBooking = null; // Close the modal
                alert('Booking updated successfully');
            } catch (error) {
                console.error(error);
                alert('Error updating booking');
            }
        },

        // Cancel editing (close the modal)
        cancelEdit() {
            this.editingBooking = null;
        },
    },
};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

table {
    width: 100%;
    padding-top: 100px;
}

table th {
    text-align: center;
    font-weight: bold;
}

table tbody {
    text-align: center;
}

.delete-booking-button,
.edit-booking-button {
    padding: 1rem;
    margin: 0 1rem;
}
</style>