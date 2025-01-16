<template>
    <h1>Portfolio</h1>
    <div class="portfolio">
        <div v-for="(image, index) in images" :key="index" class="portfolio-item">
            <img :src="image" :alt="'Portfolio Image ' + (index + 1)" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Array of image URLs (replace with actual image paths)
            images: [
                'https://scontent-vie1-1.xx.fbcdn.net/v/t1.6435-9/155879135_1766909003489447_4614197779898316115_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=WeLdhBaAkNsQ7kNvgHrCYHh&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=AJyUUgo9grfoZkaQChuvjjy&oh=00_AYBGnAovW7zW_4-Kp8oZugTsgAemWjw0IquiTgH_bN24Yg&oe=67AFF855',
                'https://scontent-vie1-1.xx.fbcdn.net/v/t1.6435-9/49345219_1138322389681448_1111104766710120448_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=0b6b33&_nc_ohc=ElKo96TxW0YQ7kNvgHCnArH&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=AGj665FYuP_SrMvB26MNZ7J&oh=00_AYCMNL2-w_n-24sshQzr-oh4JDAAY8e7GPj_yxnHH9mLGg&oe=67AFE467',
                'https://scontent-vie1-1.xx.fbcdn.net/v/t1.6435-9/49789400_1137699359743751_3042052372852375552_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=0b6b33&_nc_ohc=8V_r1JhFmmMQ7kNvgGrNA27&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=AtfRat4IivjYqVDh2qHraho&oh=00_AYA5LnEy_Q15tgcBoQHF2_E34d0_k3VRwxVzS2B4I_bauQ&oe=67AFD799',
                'https://scontent-vie1-1.xx.fbcdn.net/v/t1.6435-9/48378910_1118415738338780_8099437485571964928_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=NWx-GkNbF1UQ7kNvgGgxEog&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=A5KZX-YdsA1JPcILR2M7e4A&oh=00_AYB4l8KHNe7utMjBhw2uTLzfJXTum-Y262fMmQ-gPci4MQ&oe=67AFCAE2',
                'https://scontent-vie1-1.xx.fbcdn.net/v/t1.6435-9/47686321_1110071419173212_4942388849427873792_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=CpvF84RakooQ7kNvgHkROz1&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=AQfOj25hCX476BXvIHfc4B-&oh=00_AYDLzhFVUWCopCA9Ja1IirQkDg-PKv6kq8YeUOwcfj-K5Q&oe=67AFDDFC',
                'https://scontent-vie1-1.xx.fbcdn.net/v/t1.6435-9/46495112_1092695437577477_5421080435083968512_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=cmDyJeEdTFIQ7kNvgEhiEr3&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=A4PSLjJQfLJoY8LY8TjlY-E&oh=00_AYAXPDViWzEBMx0niarHzU1W1YCp3cAbezyneET64GQ-Xw&oe=67AFFDBF',
                'https://scontent-vie1-1.xx.fbcdn.net/v/t1.6435-9/46213691_1091743551005999_2562941336395186176_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=f727a1&_nc_ohc=gZaYDtgsK20Q7kNvgFTCtK_&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=A30OE-IY_CVYaxGSgTIwURw&oh=00_AYA2SyfZXZKY3QMLn6lqeCb4OeXL8VrIIHMtlPuWdBdjWg&oe=67AFF378',
                'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/467537237_2786909154822755_5642673479305691232_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=T9uwR0j3eWMQ7kNvgG7VWNx&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=ArLcaLuAX4uWH3_OCdOV3xp&oh=00_AYAt7pqR4KiltfJGodefJjmBS8Hva1nLJK9f74raa1QcMw&oe=678E4E33',
            ]
        };
    }
};
</script>

<style scoped>
.portfolio {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    /* padding: 2rem; */
    margin: auto;
    margin-bottom: 3rem;
    opacity: 1;
    transition: 420ms ease;
    gap: 1rem;
}

.portfolio:hover>* {
    /* opacity: 50%; */
}

.portfolio-item img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    /* border-radius: 8px; */
    display: block;
}

h1 {
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: ivory;
    text-align: center;
    font-size: 48pt;
}
</style>
