<script setup>

</script>

<template>
    <div>
        <div class="bg-image"></div>
        <!-- Dynamic Heading -->
        <h1>Üdvözöl a <br />Broo's Barber</h1>
        <p>
            Az online időpontfoglalás egy egyszerű és kényelmes módja annak, hogy biztosítsd a helyed a fodrászatban,
            anélkül hogy telefonálnod kellene vagy személyesen keresnéd fel a szalont.
        </p>
        <form id="bookingForm" @submit.prevent="submitForm">
            <h1>Foglalj időpontot</h1>
            <p class="step-heading">{{ stepHeading }}</p>
            <div v-if="step === 1">
                <input placeholder="Ird be a neved..." type="text" name="name" id="name" v-model="formData.name"
                    required autofocus>
                <br>
                <div class="buttons">
                    <button class="next-button" :disabled="formData.name.length < 5"
                        @click.prevent="goToNextStep"></button>
                </div>
            </div>

            <!-- Show Date Picker only if Name is filled -->
            <div v-if="formData.name && step === 2">
                <input type="date" name="time" id="time" v-model="formData.time" required autofocus :min="minDate"
                    :max="maxDate" @change="onDateChange" />
                <br>
                <div class="buttons">
                    <button class="reset-button" @click.prevent="resetForm"></button> <!-- Reset the form -->
                    <button class="next-button" :disabled="!formData.time" @click.prevent="goToNextStep"></button>
                </div>
            </div>

            <!-- Hour Picker Step -->
            <div v-if="formData.name && step === 3">
                <input type="time" name="hour" id="hour" step="60" v-model="formData.hour" required :min="minHour"
                    :max="maxHour" /> <br>
                <div class="buttons">
                    <button class="reset-button" @click.prevent="resetForm"></button> <!-- Reset the form -->
                    <button class="back-button " @click.prevent="goToPreviousStep">Vissza</button>
                    <!-- Go back to the previous step -->
                    <button class="next-button" :disabled="!formData.hour" @click.prevent="goToNextStep"></button>
                </div>
            </div>

            <!-- Confirmation Step -->
            <div v-if="formData.name && step === 4">
                <p>Name: {{ formData.name }}</p>
                <p>Date: {{ formData.time }}</p>
                <p>Hour: {{ formData.hour }}</p> <!-- Format the hour properly -->
                <div class="buttons">
                    <button class="reset-button" @click.prevent="resetForm"></button> <!-- Reset the form -->
                    <button type="submit" @click.prevent="submitForm">Submit</button> <!-- Submit form here -->
                </div>
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
                    return 'Melyik napon jönnel?';
                case 3:
                    return 'Pontosan mikor?';
                case 4:
                    return 'Osszesites elfogadasa.';
                default:
                    return '';
            }
        },
    },
    methods: {
        async onDateChange() {
            try {
                const datePicker = document.getElementById("time");
                this.formData.hour = ''; // Reset the selected hour
                if (!this.formData.time) {
                    this.availableHours = []; // Clear hours if no date is selected
                    return;
                }
                const response = await fetch(`/api/available-hours?date=${this.formData.time}`);

                // Check for a non-200 response
                if (!response.ok) {
                    throw new Error(`Failed to fetch available hours: ${response.statusText}`);
                }

                // Attempt to parse JSON
                const data = await response.json();
                console.log("Available hours fetched:", data.hours);
                this.availableHours = data.hours;
            } catch (error) {
                console.error("Error in onDateChange:", error);
                this.availableHours = []; // Reset on error
            }
        }
        ,
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
                this.resetForm();
                alert("Booking successfully created.")
                // setTimeout(() => window.location.href = "/", 2000)
            } else {
                alert('Error submitting booking. Please try again.');
            }
        },
    },
};
</script>

<style scoped>
/* Styles for calendar */
* {
    color: ivory;
}

form {
    background-color: rgba(0, 0, 0, 30%);
    padding: 0rem;
    margin: 2rem 1rem;
    padding: 3rem;
    text-align: center;
}

.calendar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    color: ivory;
    /* border: 1px solid #ccc; */
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    background-color: black;
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

h1 {
    font-weight: 600;
    font-family: "Frank Ruhl Libre", serif;
    letter-spacing: 2px;
    font-size: 10vw;
    line-height: 1;
    margin: 2rem 0;
}

form>h1 {
    font-size: 2rem;
}

p.step-heading {
    font-family: "Frank Ruhl Libre", serif;
    font-size: 21px;
}

h1,
p {
    font-family: "Frank Ruhl Libre", serif;
    letter-spacing: 2px;
    text-align: center;
}

h2 {
    letter-spacing: 2px;
}

button {
    border-radius: 0% !important;
    background-color: transparent;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 3px;
    font-size: 18px !important;
    box-shadow: inset 1px 1px 0 #E6BE8A, inset -1px -1px 0 #E6BE8A;
    transition: 420ms all ease;
    font-family: "Frank Ruhl Libre", serif;
    letter-spacing: 2px;
}

button:disabled {
    opacity: 10%;
    cursor: none;
}

button:hover:not(:disabled) {
    background-color: #E6BE8A;
}

select {
    padding: 5px;
    margin-top: 10px;
    font-size: 1em;
}

input,
label {
    font-family: "Frank Ruhl Libre", serif;
    letter-spacing: 2px;
}

input {
    color-scheme: light;
    font-size: 24px;
    padding: 1rem;
    margin: 2rem 0;
    width: 100%;
    max-width: 400px;
    box-shadow: inset 1px 1px 0 #E6BE8A, inset -1px -1px 0 #E6BE8A;
    transition: 420ms ease-in-out;
    background: transparent !important;
    align-self: center;
}

input:is(:-webkit-autofill, :autofill) {
    background-color: transparent !important;
    font-size: 24px;
}

input:focus {
    box-shadow: inset 1px 1px 0 ivory, inset -1px -1px 0 ivory;
    backdrop-filter: blur(15px);
}

input::placeholder {
    color: rgba(255, 255, 240, 0.422);
}

input::cue-region {
    color: white;
}

.bg-image {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: url("../assets/barber-shop-background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    z-index: -100;
    animation: zoom 80000ms ease forwards infinite;
}

@keyframes zoom {
    0% {
        transform: scale(1);
    }

    25% {
        transform: scale(1.2);
    }

    50% {
        transform: scale(1.5);
    }

    75% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

.bg-image::after {
    content: "";
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(31, 31, 31, 0.772);
    backdrop-filter: blur(3px);
}

.buttons {
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
}

.buttons button {
    /* margin-left: 1rem; */
    font-size: 21px;
}

.reset-button,
.back-button {
    box-shadow: none !important;
}

.reset-button::after,
.next-button::after {
    content: "Újrakezdés";
}

.next-button::after {
    content: "Következő";
}

input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
    font-size: 21px;
}

@media screen and (max-width: 650px) {
    form {
        padding: 1rem;
    }

    .calendar-container {
        position: fixed;
        top: 0;
    }

    button {
        font-size: 12px !important;
    }

    input {
        font-size: 12px !important;
        margin-left: 0;
    }

    .next-button::after {
        content: "Előre";
    }

    .reset-button::after {
        content: "Újra";
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
        /* background-color: red; */
    }

    /* ::-webkit-datetime-edit
    ::-webkit-datetime-edit-fields-wrapper
    ::-webkit-datetime-edit-text

    ::-webkit-datetime-edit-year-field
    ::-webkit-datetime-edit-month-field
    ::-webkit-datetime-edit-week-field
    ::-webkit-datetime-edit-day-field
    ::-webkit-datetime-edit-hour-field
    ::-webkit-datetime-edit-minute-field
    ::-webkit-datetime-edit-second-field
    ::-webkit-datetime-edit-millisecond-field
    ::-webkit-datetime-edit-ampm-field

    ::-webkit-inner-spin-button
    ::-webkit-calendar-picker-indicator */
}
</style>