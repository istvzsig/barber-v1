<template>
    <div>
        <!-- Dynamic Heading -->
        <form id="bookingForm" @submit.prevent="submitForm">
            <h1>{{ stepHeading }}</h1>
            <div v-if="step === 1">
                <label for="name" aria-required="true">Name:</label>
                <input type="text" name="name" id="name" v-model="formData.name" required> <br>
                <button v-if="formData.name" @click.prevent="goToNextStep">Next</button>
            </div>

            <!-- Show Date Picker only if Name is filled -->
            <div v-if="formData.name && step === 2">
                <label for="time">Reserved Date:</label>
                <input type="date" name="time" id="time" v-model="formData.time" required :min="minDate" :max="maxDate"
                    @change="onDateChange" /> <br>
                <button v-if="formData.time" @click.prevent="goToNextStep">Next</button>
                <button @click.prevent="resetForm">Reset</button> <!-- Reset the form -->
            </div>

            <!-- Hour Picker Step -->
            <div v-if="formData.name && step === 3">
                <label for="hour">Reserved Hour:</label>
                <input type="time" name="hour" id="hour" v-model="formData.hour" required :min="minHour"
                    :max="maxHour" /> <br>
                <button v-if="formData.hour" @click.prevent="goToNextStep">Next</button>
                <button @click.prevent="goToPreviousStep">Back</button> <!-- Go back to the previous step -->
                <button @click.prevent="resetForm">Reset</button> <!-- Reset the form -->
            </div>

            <!-- Confirmation Step -->
            <div v-if="formData.name && step === 4">
                <p>Confirm your booking:</p>
                <p>Name: {{ formData.name }}</p>
                <p>Date: {{ formData.time }}</p>
                <p>Hour: {{ formData.hour }}</p> <!-- Format the hour properly -->
                <button @click.prevent="resetForm">Reset</button> <!-- Reset the form -->
                <button type="submit" @click.prevent="submitForm">Submit</button> <!-- Submit form here -->
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            step: 1,
            formData: {
                name: '',
                time: '',
                hour: '',
            },
            minDate: new Date().toISOString().split('T')[0], // Disable past days
            availableHours: [],
        };
    },
    computed: {
        stepHeading() {
            switch (this.step) {
                case 1:
                    return 'Van benceneved?';
                case 2:
                    return 'Melyik napon jonnel?';
                case 3:
                    return 'Pontosan mikor?';
                case 4:
                    return 'Foglalas elfogadasa.';
                default:
                    return '';
            }
        },
    },
    methods: {
        async onDateChange() {
            try {
                this.formData.hour = ''; // Reset the selected hour
                if (!this.formData.time) {
                    this.availableHours = []; // Clear hours if no date is selected
                    return;
                }
                const response = await fetch(`/api/available-hours?date=${this.formData.time}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch available hours: ${response.statusText}`);
                }
                const data = await response.json();
                console.log("Available hours fetched:", data.hours);
                this.availableHours = data.hours;
            } catch (error) {
                console.error("Error in onDateChange:", error);
                this.availableHours = []; // Reset on error
            }
        },
        goToNextStep() {
            if (this.step <= 4) this.step++;
        },
        goToPreviousStep() {
            if (this.step > 1) this.step--;
        },
        resetForm() {
            this.step = 1;
            this.formData = { name: '', time: '', hour: '' };
            this.availableHours = [];
        },
        async submitForm() {
            const response = await fetch('http://localhost:3000/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.formData),
            });
            if (response.ok) {
                alert('Booking successful!');
                this.resetForm();
            } else {
                alert('Error submitting booking. Please try again.');
            }
        },
    },
};
</script>

<style scoped>
/* Styles for calendar */
.calendar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.calendar-header {
    font-size: 1.2em;
    margin-bottom: 10px;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
}

.calendar-day {
    padding: 10px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.calendar-day:hover {
    background-color: #f0f0f0;
}

.selected {
    background-color: #007bff;
    color: white;
}

button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 3px;
}

button:hover {
    background-color: #0056b3;
}

select {
    padding: 5px;
    margin-top: 10px;
    font-size: 1em;
}

input {
    padding: 1rem;
    margin: 1rem;
    border: 1px solid #eee;
    width: 100%;
    max-width: 400px;
}

button {
    margin: 1rem 0;
}

button {
    background-color: red;
}
</style>