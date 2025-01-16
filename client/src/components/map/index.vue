<template>
    <div class="map">
        <hr class="dashed">
        <h1>Szalonunk</h1>
        <h2>Jókai Mór u. 19. Gyula, Hungary 5700</h2>
        <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
            :src="mapUrl"></iframe>
    </div>
</template>

<script>
export default {
    name: "LocationMap",
    props: {
        latitude: {
            type: Number,
            default: 46.6461439,
        },

        // 46.6461439, 21.2696224
        longitude: {
            type: Number,
            default: 21.2696224,
        },
        zoom: {
            type: Number,
            default: 20,
        },
    },
    computed: {
        mapUrl() {
            // Adjust bounding box to create the map frame
            const bboxOffset = 0.01 / this.zoom; // Adjust for zoom level
            return `https://www.openstreetmap.org/export/embed.html?bbox=${this.longitude - bboxOffset},${this.latitude - bboxOffset},${this.longitude + bboxOffset},${this.latitude + bboxOffset}&layers==HN`;
        },
    },
};
</script>

<style scoped>
.map {
    width: 100%;
    margin-bottom: 3rem;
    pointer-events: none;
    /* Cut off garbage footer of map */
    /* clip-path: polygon(0 0, 100% 0, 100% 92%, 0 92%); */
}

hr.dashed {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, #E6BE8A 50%, transparent 50%);
    background-size: 15px 100%;
    margin: 2rem auto;
    margin-top: 1rem;
    width: 30%;
}

h1 {
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: ivory;
    text-align: center;
    font-size: 48pt;
}

h2 {
    color: ivory;
    text-align: center;
    margin: 2rem;
}

.map iframe {
    opacity: 90%;
    /* border-radius: 15px; */
    box-shadow: 0px 55px 125px #e6be8a3f, 0px -55px 125px #e6be8a3f;
}
</style>