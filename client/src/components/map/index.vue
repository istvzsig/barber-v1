<template>
    <div class="map">
        <hr class="dashed">
        <h1>Address</h1>
        <h2>Jókai Mór u. 19. Gyula, Hungary 5700</h2>
        <iframe scrolling="no" marginheight="0" marginwidth="0"
            :src="`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4782.676139409713!2d21.26700102261683!3d46.645631460760825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4745d6a1fdf56ba5%3A0xaccbc7a2cdaa8e6!2sFigaro!5e0!3m2!1sen!2shu!4v1737069408432!5m2!1sen!2shu`"></iframe>
    </div>
</template>

<style scoped>
div.map iframe {
    width: 100%;
    vertical-align: middle;
    height: 600px;
}

hr.dashed {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, #E6BE8A 50%, transparent 0%);
    background-size: 15px 100%;
    margin: 0 auto;
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
    margin-bottom: 1rem;
}
</style>
