<template>
    <div>
        <div class="bg-image"></div>
        <!-- Dynamic Heading -->
        <form id="bookingForm" @submit.prevent="submitForm">
            <h1>Welcome to Broo's Barber v1</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi optio, quibusdam magnam provident
                beatae sunt laborum eius. Nobis repudiandae quam omnis, minus dolor cumque numquam sequi eum. Quasi,
                minima sed!</p>
            <h1>{{ stepHeading }}</h1>
            <div v-if="step === 1">
                <input placeholder="Ird be a neved..." type="text" name="name" id="name" v-model="formData.name"
                    required>
                <br>
                <button :disabled="!formData.name" @click.prevent="goToNextStep">Next</button>
            </div>

            <!-- Show Date Picker only if Name is filled -->
            <div v-if="formData.name && step === 2">
                <input type="date" name="time" id="time" v-model="formData.time" required :min="minDate" :max="maxDate"
                    @change="onDateChange" />
                <br>
                <button @click.prevent="resetForm">Reset</button> <!-- Reset the form -->
                <button :disabled="!formData.time" @click.prevent="goToNextStep">Tovabb</button>
            </div>

            <!-- Hour Picker Step -->
            <div v-if="formData.name && step === 3">
                <input type="time" name="hour" id="hour" v-model="formData.hour" required :min="minHour"
                    :max="maxHour" /> <br>
                <button :disabled="!formData.hour" @click.prevent="goToNextStep">Next</button>
                <button @click.prevent="goToPreviousStep">Visszalepes</button> <!-- Go back to the previous step -->
                <button @click.prevent="resetForm">Reset</button> <!-- Reset the form -->
            </div>

            <!-- Confirmation Step -->
            <div v-if="formData.name && step === 4">
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
                setTimeout(() => window.location.href = "/", 2000)
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

.calendar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    color: ivory;
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

h1 {
    font-weight: 600;
    font-family: "Frank Ruhl Libre", serif;
    letter-spacing: 2px;
    font-size: 10vw;
    line-height: 1;
    margin: 1rem 0;
}

h1,
p {
    text-align: center;
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

input,
label {
    font-family: "Frank Ruhl Libre", serif;
    letter-spacing: 2px;
}

input {
    color-scheme: light;
    font-size: 24px;
    padding: 1rem;
    margin: 1rem;
    width: 100%;
    max-width: 400px;
    box-shadow: inset 1px 1px 0 #E6BE8A, inset -1px -1px 0 #E6BE8A;
    transition: 420ms ease-in-out;
    background: transparent !important;
}

input:is(:-webkit-autofill, :autofill) {
    background: transparent !important;
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

button {
    margin: 1rem 0;
}

button {
    background-color: red;
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
</style>