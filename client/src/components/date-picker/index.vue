<template>
    <div class="datepicker-component">
        <input type="date" name="time" id="time" v-model="formData.time" required :min="minDate" :max="maxDate"
            @change="onDateChange" />
    </div>
</template>

<script>
export default {
    name: 'DatePickerComponent',
    props: {
        // Declare formData as a prop
        formData: {
            type: Object,
            required: true
        },
        // Declare minDate as a prop
        minDate: {
            type: String,
            required: false
        },
        // Declare maxDate as a prop
        maxDate: {
            type: String,
            required: false
        }
    },
    methods: {
        // Handle change in the date picker
        onDateChange(event) {
            this.$emit('date-changed', this.formData.time); // Emit an event with the updated date
        }
    }
}
</script>

<style scoped>
/* Add your styles here */
</style>
